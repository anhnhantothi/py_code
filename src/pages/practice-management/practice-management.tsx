import React, { useState, useEffect, useCallback } from 'react';
import { DataTable, DataTablePageEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';
import debounce from 'lodash.debounce';
import { paginatorTemplate, rowsPerPageOptions } from '../../untils/common';
import { Button } from 'primereact/button';
import { Trash } from 'lucide-react';
import { Chips } from 'primereact/chips';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { Checkbox } from 'primereact/checkbox';
import { getDifficultyColor, SearchSuggestion } from '../practice/SearchSuggestionCard';
import axios from 'axios';
import { useToast } from '../../contexts/ToastContext';
import { Difficulty } from '../practice/difficultyEnum';

export const fetchPractices = async (): Promise<SearchSuggestion[]> => {
    try {
        const response = await axios.get('http://localhost:5000/api/practices');
        return response.data.map((item: SearchSuggestion) => item);
    } catch (error) {
        console.error('Lỗi khi gọi API practice:', error);
        return [];
    }
};

const softDeletePractice = async (practiceId: number) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:5000/api/practices/delete?practiceId=${practiceId}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return await res.json();
};

const updatePractice = async (practiceId: number, data: any) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`/api/practices/update?practiceId=${practiceId}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    return await res.json();
};

const updateActiveStatus = async (practiceId: number, value: boolean) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:5000/api/practices/active-status?practiceId=${practiceId}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ value })
    });

    return await res.json();
};

const createPractice = async (data: any) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`/api/practices/create`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    return await res.json();
};


export default function PracticeManage() {
    const [customers, setCustomers] = useState<SearchSuggestion[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalRecords, setTotalRecords] = useState(0);
    const [dialogName, setDialogName] = useState<string>("Chỉnh sửa bài tập");
    const [visible, setVisible] = useState<boolean>(false);
    const [customer, setCustomer] = useState<SearchSuggestion>();
    const [searchKeyword, setSearchKeyword] = useState('');
    const [debouncedKeyword, setDebouncedKeyword] = useState('');
    const [lazyParams, setLazyParams] = useState({
        first: 0,
        rows: 10,
        page: 0,
    });
    const toast = useToast();
    const columns = [
        { field: 'title', header: 'Tiêu đề', frozen: true },
        {
            field: 'difficulty', header: 'Độ Khó', body: (rowData: SearchSuggestion) => {

                return <div className={`w-fit px-3 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(rowData.difficulty)}`}>
                    {rowData.difficulty}
                </div>
            }
        },
        {
            field: 'tags', header: 'Nhãn', body: (rowData: SearchSuggestion) => {
                const { tags } = rowData;
                return <div className="flex gap-2 flex-wrap">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md border border-gray-200"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            }
        },
        { field: 'completionRate', header: 'Tỉ lệ hoàn thành' },
        {
            field: 'isActive', header: 'Trạng thái', body: (rowData: SearchSuggestion) => {
                return <Checkbox checked={rowData.isActive ?? false} className='flex justify-center' onChange={(e) => {
                    confirmtChangeStatus(rowData.id!, e.checked ?? false)
                }} />
            }
        },
        { field: 'likes', header: 'Số lượt thích' },
        {
            field: 'id', header: '', body: (rowData: SearchSuggestion) => {

                function handleDelete(e: React.MouseEvent<HTMLDivElement>, id: any): void {
                    e.stopPropagation();
                    confirmDelete(id);
                }

                return <div className='flex gap-4'>
                    <Trash className='!text-red-500 mr-5"' size={16} onClick={(e: any) => handleDelete(e, rowData.id)} />
                </div>;
            }
        }
    ];



    const acceptDel = (id: number) => {
        setLoading(true)
        softDeletePractice(id).then((e) => {
            getDataUser();
            toast.showSuccess("Delete success")
        }).catch(() => {
            toast.showSuccess("Delete fail")
            setLoading(false)
        })

    }



    const confirmDelete = (id: number) => {
        confirmDialog({
            message: 'Bạn có chắc chắn muốn xóa bài tập không',
            header: 'Xác nhận xóa người dùng',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            acceptLabel: 'Xác nhận',
            rejectLabel: 'Hủy',
            accept: () => acceptDel(id),
        });
    };


    const acceptChangeStatus = (id: number, value: boolean) => {
        setLoading(true)
        updateActiveStatus(id, value).then((e) => {
            getDataUser();
            toast.showSuccess("change success")
        }).catch(() => {
            toast.showSuccess("change fail")
            setLoading(false)
        })

    }



    const confirmtChangeStatus = (id: number, status: boolean) => {
        confirmDialog({
            message: `Bạn có chắc chắn muốn ${status ? 'kích hoạt' : 'tắt'} bài tập không`,
            header: `Xác nhận  ${status ? 'kích hoạt' : 'tắt'} bài tập`,
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            acceptLabel: 'Xác nhận',
            rejectLabel: 'Hủy',
            accept: () => acceptChangeStatus(id, status),
        });
    };


    const onPageChange = (event: DataTablePageEvent) => {
        setLazyParams({
            first: event.first,
            rows: event.rows,
            page: event.page ?? 0,
        });
    };

    const getDataUser = () => {
        setLoading(true)
        fetchPractices().then((e) => {
            const users: SearchSuggestion[] = e;
            setCustomers(users);
            console.log(e.length)
        }).catch((e) => {

        })

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
                <Button className='!bg-blue-500' onClick={() => {
                    setVisible(true)
                    setDialogName('Thêm bài tập')
                    const emptySearchSuggestion: SearchSuggestion = {
                        id: 0,
                        title: '',
                        difficulty: Difficulty.EASY,
                        tags: [],
                        isActive: false,
                        completionRate: 0,
                        likes: 0,
                        slug: '',
                    };
                    setCustomer(emptySearchSuggestion)
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

    function handleEdit(rowData: SearchSuggestion): void {
        setCustomer(rowData)
        setVisible(true)
    }
    function handleUpdatePractive() {
        setLoading(true)
        if (customer?.id === null) {
            updatePractice(customer?.id!, customer!).then((e) => {
                getDataUser();
                toast.showSuccess("Update success")
            }).catch(() => {
                toast.showError("Update fail")

            })
        } else {
            createPractice(customer!).then((e) => {
                getDataUser();
                toast.showSuccess("Create success")
            }).catch(() => {
                toast.showError("Update fail")

            })
        }

        setVisible(false)
    }
    const header = renderHeader();
    const handleUpdateChip = (value: any, isDelete: boolean) => {
        let res = customer?.tags ?? [];
        if (isDelete) {
            res = res.filter((e) => e !== value);
        } else {
            res = value;

        }
        setCustomer({ ...customer!, tags: res });


    };

    const difficultyOptions = [
        { name: 'Dễ', value: 'EASY' },
        { name: 'Trung bình', value: 'MEDIUM' },
        { name: 'Khó', value: 'HARD' }
    ];
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
                onSelectionChange={(e) => handleEdit(e.value)}
                selectionMode={"single"}
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
                    <Column key={col.field} field={col.field} body={col.body} header={col.header} style={{ minWidth: '12rem', alignItems: "center" }} frozen={col.frozen} />
                ))}
            </DataTable>


            <ConfirmDialog />

            <Dialog header={dialogName} visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }} closeIcon={true} icons={<i className='pi pi-close text-amber-400'></i>}>
                <label className='mb-2'>
                    <p className='mb-2'>Tiêu đề</p>
                    <InputText className='w-full' value={customer?.title} onChange={e => setCustomer({ ...customer!, title: e.target.value })} />
                </label>
                <div className='flex gap-2 my-4'>
                    <div className='flex flex-col w-full'>
                        <p className='mb-2'>Độ Khó {customer?.difficulty}</p>
                        <Dropdown
                            value={customer?.difficulty}
                            onChange={(e) => setCustomer({ ...customer!, difficulty: e.value })}
                            options={difficultyOptions}
                            optionLabel="name"
                            placeholder="Chọn độ khó"
                            className="w-full"
                        />
                    </div>
                    <div className='flex flex-col w-full'>
                        <p className='mb-2'>Nhãn</p>
                        <Chips
                            value={customer?.tags || []}
                            onChange={(e) => handleUpdateChip(e.value, false)}
                            max={3}
                            maxLength={1}
                            variant='outlined'
                            allowDuplicate={false}
                            onRemove={(e) => {
                                handleUpdateChip(e.value, true);
                                return true;
                            }}
                            className='!w-full min-w-full'
                            placeholder="Thêm nhãn"
                        />
                    </div>
                </div>

                <label className='w-full mt-2'>
                    <p className='mb-2'>Đề bài</p>
                    <InputTextarea className='w-full' rows={5} cols={30} />
                </label>
                <div className='flex  justify-end pt-5 px-5'>
                    <Button className='!bg-gray-500 !mr-4' onClick={() => setVisible(false)}>Hủy</Button>
                    <Button className='!bg-blue-500' onClick={() => { handleUpdatePractive(); }}>Lưu</Button>
                </div>
            </Dialog>
        </div>
    );
}
