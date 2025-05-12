import React, { useState, useEffect, useCallback } from 'react';
import { DataTable, DataTablePageEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { ConfirmDialog } from 'primereact/confirmdialog';
import moment from 'moment';
import debounce from 'lodash.debounce';
import { paginatorTemplate, rowsPerPageOptions } from '../../untils/common';
import { generateFakeUsers, User } from '../customer/model';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { CheckIcon, Trash } from 'lucide-react';



export default function PermissionManage() {
    const [customers, setCustomers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalRecords, setTotalRecords] = useState(0);
    const [visible, setVisible] = useState<boolean>(false);
    const [permission, setPermission] = useState<User[]>([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [debouncedKeyword, setDebouncedKeyword] = useState('');
    const [lazyParams, setLazyParams] = useState({
        first: 0,
        rows: 10,
        page: 0,
    });
    //   const toast = useToast();
    const columns = [
        { field: 'fullName', header: 'Họ và tên', frozen: true },
        { field: 'username', header: 'Tên đăng nhập' },
        { field: 'code', header: 'Mã khách hàng' },
        { field: 'gender', header: 'Giới tính' },
        { field: 'email', header: 'Email' },
        { field: 'phoneNumber', header: 'Số điện thoại' },
        {
            field: 'id', header: '', body: (rowData: any) => {
                function handleDelete(id: any): void {
                }
                return <Trash size={20} className="text-red-600" />
            }
        }
    ];


    //   function handleDelete(id: any,isActive : boolean): void {
    //     confirmDelete(id,isActive)
    //   }

    //   const acceptDel = (id: string,isActive : boolean) => {
    //     setLoading(true)
    //     deleteUser(id,isActive).then((e) => {
    //       getDataUser();
    //       toast.showSuccess("Delete success")
    //     }).catch(() => {
    //       setLoading(false)
    //       toast.showError("Delete fail")
    //     })
    //   }



    //   const confirmDelete = (id: string,isActive :boolean) => {
    //     confirmDialog({
    //       message: 'Bạn có chắc chắn muốn xóa người dùng không',
    //       header: 'Xác nhận xóa người dùng',
    //       icon: 'pi pi-info-circle',
    //       defaultFocus: 'reject',
    //       acceptClassName: 'p-button-danger',
    //       acceptLabel: 'Xác nhận',
    //       rejectLabel: 'Hủy',
    //       accept: () => acceptDel(id,isActive),
    //     });
    //   };


    const onPageChange = (event: DataTablePageEvent) => {
        setLazyParams({
            first: event.first,
            rows: event.rows,
            page: event.page ?? 0,
        });
    };

    const buildParamsGetUser = (): object => {
        return {
            page: lazyParams.page,
            size: lazyParams.rows,
            keyword: debouncedKeyword
        };
    }

    const getDataUser = () => {
        setLoading(true)
        // const _res: ApiResponse<User> = res.data
        //   setCustomers(_res.data?.content ?? [])
        //   setTotalRecords(res.data.data.total)
        const users = generateFakeUsers(10).filter((u) => {
            if (u.isAdmin) return u

        });

        setCustomers(users)
        setTotalRecords(50)
        setLoading(false)
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
                <Button className='!bg-blue-500' onClick={() => setVisible(true)} >
                    Thêm quyền
                </Button>
            </div>
        );
    };
    const renderHeaderCreate = () => {
        return (
            <div className='flex justify-between gap-[20px]'>
                <div className="flex justify-content-end">
                    <IconField iconPosition="left">
                        <InputIcon className="pi pi-search" />
                        <InputText value={searchKeyword} onChange={onSearchChange} placeholder="Tìm kiếm bằng tên , gmail , tài khoản" />
                    </IconField>
                </div>
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

    function handleSavePermisson() {
        setPermission([])
        setVisible(false)
    }

    //   function handleEdit(rowData: User): void {
    //     permission(rowData)
    //     setVisible(true)
    //   }

    const header = renderHeader();
    return (
        <div className='h-screen'>
            <DataTable
                value={customers}
                scrollable
                paginator
                lazy
                first={lazyParams.first}
                rows={lazyParams.rows}
                totalRecords={totalRecords}
                loading={loading}
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} customer"
                paginatorTemplate={paginatorTemplate}
                rowsPerPageOptions={rowsPerPageOptions}
                onPage={onPageChange}
                header={header}
                emptyMessage="No customers found."
                className='w-full ' >
                <Column
                    header="STT"
                    frozen
                    body={(_, options) => options.rowIndex + 1}
                    style={{ width: '80px' }}
                />
                {columns.map((col, _) => (
                    <Column key={col.field} field={col.field} header={col.header} body={col.body} style={{ minWidth: '12rem' }} frozen={col.frozen} />
                ))}
            </DataTable>
            <ConfirmDialog />

            <Dialog header={"Thêm quyền"} visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }} closeIcon={true} icons={<i className='pi pi-close text-amber-400'></i>}>
                <div>
                    <DataTable
                        value={customers}
                        scrollable
                        paginator
                        lazy
                        first={lazyParams.first}
                        rows={lazyParams.rows}
                        totalRecords={totalRecords}
                        loading={loading}
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} customer"
                        paginatorTemplate={paginatorTemplate}
                        rowsPerPageOptions={rowsPerPageOptions}
                        onPage={onPageChange}
                        selection={permission}
                        onSelectionChange={(e) => setPermission(e.value)}
                        selectionMode={"multiple"}
                        header={renderHeaderCreate}
                        emptyMessage="No customers found."
                        className='w-full ' >
                        <Column
                            header="STT"
                            frozen
                            body={(_, options) => options.rowIndex + 1}
                            style={{ width: '80px' }}
                        />

                        <Column field="fullName" header="Họ và tên" style={{ minWidth: '12rem' }} />
                        <Column field="username" header="Tài khoản" style={{ minWidth: '12rem' }} />
                        <Column field="email" header="Gmail" style={{ minWidth: '12rem' }} />
                        <Column selectionMode="multiple" frozen headerStyle={{ width: '3rem' }} />
                    </DataTable>
                    <div className='flex  justify-end pt-5 px-5'>
                        <Button className='!bg-gray-500 !mr-4' onClick={() => setVisible(false)}>Hủy</Button>
                        <Button className='!bg-blue-500' onClick={() => handleSavePermisson}>Lưu</Button>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
