import React, { useState, useEffect, useCallback } from 'react';
import { DataTable, DataTablePageEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import {  ConfirmDialog } from 'primereact/confirmdialog';
import debounce from 'lodash.debounce';
import {  rowsPerPageOptions } from '../../untils/common';
import { Button } from 'primereact/button';
import {  SearchSuggestion } from '../practice/SearchSuggestionCard';
import axios from 'axios';
import { useToast } from '../../contexts/ToastContext';
import { useNavigate } from 'react-router-dom';
import { Topic } from './lesson-detail';




export default function LessonManage() {
    const [customers, setCustomers] = useState<SearchSuggestion[]>([]);
    const [topics, setTopics] = useState([]);

    const [loading, setLoading] = useState(true);
    const [totalRecords, setTotalRecords] = useState(0);
    const [dialogName, setDialogName] = useState<string>("Chỉnh sửa bài tập");
    const [visible, setVisible] = useState<boolean>(false);
    const [customer, setCustomer] = useState<SearchSuggestion>();
    const [searchKeyword, setSearchKeyword] = useState('');
    const [debouncedKeyword, setDebouncedKeyword] = useState('');
    const navigate = useNavigate();

    const [lazyParams, setLazyParams] = useState({
        first: 0,
        rows: 10,
        page: 0,
    });
    const toast = useToast();
    const columns = [
        { field: 'sort_order', header: 'Sắp xếp' },

        { field: 'name', header: 'Tiêu đề', frozen: true },
    ];


    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:5000/topics')
            .then(response => {
                setTopics(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Lỗi khi lấy topic lessons:', error);
            });
        setLoading(false);

    }, []);


    const onPageChange = (event: DataTablePageEvent) => {
        setLazyParams({
            first: event.first,
            rows: event.rows,
            page: event.page ?? 0,
        });
    };

    const getDataUser = () => {
    }

    useEffect(() => {
        getDataUser();
    }, [lazyParams, debouncedKeyword]);



    const renderHeader = () => {
        return (
            <div className='flex justify-between gap-[20px]'>
                <div className="flex justify-content-end">
                    <IconField iconPosition="left">
                        <InputIcon className="pi pi-search" />
                        <InputText value={searchKeyword} onChange={onSearchChange} placeholder="Tìm kiếm bằng tên , gmail , tài khoản" />
                    </IconField>
                </div>
                <Button className='!bg-blue-500' onClick={() => {
                    handleCreate()
                }} >
                    Thêm bài tập
                </Button>
            </div>
        );
    };

    const debounceSearch = useCallback(
        debounce((value: string) => {
            setDebouncedKeyword(value);
            setLazyParams((prev) => ({
                ...prev,
                first: 0,
                page: 0,
            }));
        }, 500),
        []
    );
    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        debounceSearch(e.target.value);
        setSearchKeyword(e.target.value);
    };

    function handleEdit(rowData: any): void {
        navigate('/admin/lesson-detail', { state: rowData, replace: true });
    }

    function handleCreate(): void {
        const rowData: Topic = {
            id: null,
            lessons: [],
            name: '',
            sort_order: topics.length + 1
        };
        navigate('/admin/lesson-detail', { state: rowData, replace: true });
    }
    const header = renderHeader();


    return (
        <div className='h-screen'>
            <DataTable
                value={topics}
                scrollable
                paginator
                lazy
                first={lazyParams.first}
                rows={lazyParams.rows}
                totalRecords={totalRecords}
                loading={loading}
                rowsPerPageOptions={rowsPerPageOptions}
                onPage={onPageChange}
                onSelectionChange={(e) => handleEdit(e.value)}
                selectionMode={"single"}
                header={header}
                emptyMessage="No customers found."
                className='w-full ' >
                {columns.map((col, _) => (
                    <Column key={col.field} field={col.field} header={col.header} style={{ minWidth: '12rem', alignItems: "center" }} frozen={col.frozen} />
                ))}
            </DataTable>
            <ConfirmDialog />
        </div>
    );
}
