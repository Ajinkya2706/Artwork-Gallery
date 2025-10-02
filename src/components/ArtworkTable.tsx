import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { fetchArtworks } from '../services/api';
import type { Artwork } from '../types';
import { useSelectionManager } from '../hooks/useSelectionManager';
import { SelectionPanel } from './SelectionPanel';
import {toast} from "sonner"

export const ArtworkTable = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const { selectedRows, handleSelection, updateSelection, selectNRows } = useSelectionManager();

  useEffect(() => {
    loadData(page);
  }, [page]);


const loadData = async (pageNum: number) => {
  setLoading(true);
  try {
    const data = await fetchArtworks(pageNum);
    setArtworks(data.data);
    setTotalRecords(data.pagination.total);
    updateSelection(data.data, pageNum);
    toast.success(`Fetched page ${pageNum}`);
  } catch (error) {
    console.error('Error:', error);
    toast.error('Failed to fetch data');
  } finally {
    setLoading(false);
  }
};
  const onPageChange = (e: any) => {
    setPage(e.page + 1);
  };

  const onSelectionChange = (e: any) => {
    handleSelection(e, artworks, page);
  };

  const handleSelectN = (n: number) => {
    selectNRows(n, artworks, page, Math.ceil(totalRecords / 12));
  };

  const headerCheckbox = (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <SelectionPanel onSubmit={handleSelectN} />
    </div>
  );

  return (
    <DataTable
      value={artworks}
      loading={loading}
      paginator
      rows={12}
      totalRecords={totalRecords}
      lazy
      first={(page - 1) * 12}
      onPage={onPageChange}
      selection={selectedRows}
      onSelectionChange={onSelectionChange}
      dataKey="id"
      selectionMode="multiple"
      tableStyle={{ minWidth: '60rem' }}
    >
      <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} header={headerCheckbox} />
      <Column field="title" header="Title" />
      <Column field="place_of_origin" header="Place of Origin" />
      <Column field="artist_display" header="Artist" />
      <Column field="inscriptions" header="Inscriptions" />
      <Column field="date_start" header="Date Start" />
      <Column field="date_end" header="Date End" />
    </DataTable>
  );
};
