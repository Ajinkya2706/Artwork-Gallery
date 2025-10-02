import { useState, useCallback } from 'react';
import type { Artwork } from '../types';

interface PageSelection {
  selected: Set<number>;
  deselected: Set<number>;
  autoSelectCount?: number;
}

export const useSelectionManager = () => {
  const [selectionState, setSelectionState] = useState<{ [key: string]: PageSelection }>({});
  const [selectedRows, setSelectedRows] = useState<Artwork[]>([]);

  const getPageKey = (page: number) => `page_${page}`;

  const updateSelection = useCallback((artworks: Artwork[], page: number) => {
    const pageKey = getPageKey(page);
    const state = selectionState[pageKey] || { selected: new Set<number>(), deselected: new Set<number>() };
    
    // Auto-select rows if autoSelectCount is set
    if (state.autoSelectCount !== undefined && state.autoSelectCount > 0) {
      artworks.slice(0, state.autoSelectCount).forEach(art => {
        if (!state.deselected.has(art.id)) {
          state.selected.add(art.id);
        }
      });
    }
    
    const selected = artworks.filter(art => {
      if (state.deselected.has(art.id)) return false;
      if (state.selected.has(art.id)) return true;
      return false;
    });
    
    setSelectedRows(selected);
  }, [selectionState]);

  const handleSelection = useCallback((e: { value: Artwork[] }, artworks: Artwork[], page: number) => {
    const pageKey = getPageKey(page);
    const state = selectionState[pageKey] || { selected: new Set<number>(), deselected: new Set<number>() };
    
    const selectedIds = new Set(e.value.map(a => a.id));
    const allIds = new Set(artworks.map(a => a.id));

    allIds.forEach(id => {
      if (selectedIds.has(id)) {
        state.selected.add(id);
        state.deselected.delete(id);
      } else {
        state.deselected.add(id);
        state.selected.delete(id);
      }
    });

    setSelectionState({ ...selectionState, [pageKey]: state });
    setSelectedRows(e.value);
  }, [selectionState]);

  const selectNRows = useCallback((n: number, artworks: Artwork[], page: number, totalPages: number) => {
    let remaining = n;
    const newState = { ...selectionState };

    for (let p = page; p <= totalPages && remaining > 0; p++) {
      const pageKey = getPageKey(p);
      const pageState: PageSelection = newState[pageKey] || { 
        selected: new Set<number>(), 
        deselected: new Set<number>() 
      };
      
      const toSelect = Math.min(remaining, 12);
      
      if (p === page) {
        // It Selects current page rows immediately
        artworks.slice(0, toSelect).forEach(art => {
          pageState.selected.add(art.id);
          pageState.deselected.delete(art.id);
        });
        setSelectedRows(artworks.slice(0, toSelect));
      } else {
        // We will mark the future pages to auto-select when visited
        pageState.autoSelectCount = toSelect;
      }
      
      newState[pageKey] = pageState;
      remaining -= toSelect;
    }

    setSelectionState(newState);
  }, [selectionState]);

  return { selectedRows, handleSelection, updateSelection, selectNRows };
};