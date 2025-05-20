import React, { useState, useEffect, useCallback } from 'react';
import { DataTable, DataTablePageEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';
import moment from 'moment';
import debounce from 'lodash.debounce';
import { generateFakeUsers, User } from './model';
import { paginatorTemplate, rowsPerPageOptions } from '../../untils/common';
import { Button } from 'primereact/button';
import { Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Checkbox } from 'primereact/checkbox';




export default function CustomerManage() {
  const [customers, setCustomers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);
  const [dialogName, setDialogName] = useState<string>("Chỉnh sửa người dùng");
  const [visible, setVisible] = useState<boolean>(false);
  const [customer, setCustomer] = useState<User>();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedKeyword, setDebouncedKeyword] = useState('');
  const navigate = useNavigate();
  const [lazyParams, setLazyParams] = useState({
    first: 0,
    rows: 10,
    page: 0,
  });
//   const toast = useToast();
  const columns = [
    { field: 'fullName', header: 'Họ và tên', frozen: true },
    { field: 'username', header: 'Tên đăng nhập' },
    { field: 'vip', header: 'VIP', body: (rowData: User) => {

return <Checkbox checked={rowData.vip} onChange={(e)=>{confirmActive(rowData.id,e.checked ?? false)}}/> ;
    } },
    { field: 'gender', header: 'Giới tính' },
    { field: 'email', header: 'Email' },
    { field: 'phoneNumber', header: 'Số điện thoại' },
    { field: 'address', header: 'Địa chỉ' },
    {
      field: 'startDate', header: 'Ngày bắt đầu', body: (rowData: User) => {
        return <div>
          {rowData.startDate ? moment(rowData.startDate).format('DD/MM/YYYY') : ""}
        </div>;
      }
    },
    {
      field: 'id',
      header: '',
      body: (rowData: User) => {
        function handleDelete(e: React.MouseEvent<HTMLDivElement>, id: any, isActive: boolean): void {
          e.stopPropagation(); // Ngăn chặn sự kiện chọn dòng
          confirmDelete(id, isActive);
        }
    
        return (
          <div
            className="text-red-600 hover:cursor-pointer"
            onClick={(e) => handleDelete(e, rowData.id, true)}
          >
            <Trash size={20} />
          </div>
        );
      }
    }
  ];

function handeActiveVip(){
}

  function handleDelete(id: any,isActive : boolean): void {
    confirmDelete(id,isActive)
  }

  const acceptDel = (id: string,isActive : boolean) => {
    setLoading(true)
    ///xóa user
    // deleteUser(id,isActive).then((e) => {
    //   getDataUser();
    //   toast.showSuccess("Delete success")
    // }).catch(() => {
    //   setLoading(false)
    //   toast.showError("Delete fail")
    // })
  }


  const acceptChange = (id: string,isActive : boolean) => {
    setLoading(true)
        ///hủy vip
    // deleteUser(id,isActive).then((e) => {
    //   getDataUser();
    //   toast.showSuccess("Delete success")
    // }).catch(() => {
    //   setLoading(false)
    //   toast.showError("Delete fail")
    // })
  }


  const confirmDelete = (id: string,isActive :boolean) => {
    confirmDialog({
      message: 'Bạn có chắc chắn muốn xóa người dùng không',
      header: 'Xác nhận xóa người dùng',
      icon: 'pi pi-info-circle',
      defaultFocus: 'reject',
      acceptClassName: 'p-button-danger !bg-red-500',
      acceptLabel: 'Xác nhận',
      rejectLabel: 'Hủy',
      accept: () => acceptDel(id,isActive),
    });
  };

  const confirmActive = (id: string,isActive :boolean) => {
    confirmDialog({
      message: `Bạn có chắc chắn muốn ${isActive?"kích hoạt":"hủy kích hoạt"} người dùng không`,
      header: `Xác nhận ${isActive?"kích hoạt":"hủy kích hoạt"}`,
      icon: 'pi pi-info-circle',
      defaultFocus: 'reject',
      acceptClassName: 'p-button-danger !bg-red-500',
      acceptLabel: 'Xác nhận',
      rejectLabel: 'Hủy',
      accept: () => acceptChange(id,isActive),
    });
  };


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
    const users = generateFakeUsers(10);

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
        <div className="">
          <Button label='Thêm mới' className='!bg-blue-500' onClick={()=>{
                   navigate('/profile', { replace: true }); // Chuyển trang ngay

          }}/>
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

  const header = renderHeader();
  return (
    <div className='h-screen'>
      <DataTable
        value={customers}
        scrollable
        paginator
        rows={lazyParams.rows}
        totalRecords={totalRecords}
        loading={loading}
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} customer"
        paginatorTemplate={paginatorTemplate}
        rowsPerPageOptions={rowsPerPageOptions}
        onPage={onPageChange}
        onSelectionChange={(e) =>{
          navigate(`/profile?userId=${e.value.id}`, { replace: true });
        }}
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
          <Column key={col.field} field={col.field} body={col.body} header={col.header} style={{ minWidth: '12rem' }} frozen={col.frozen} />
        ))}
      </DataTable>
      <ConfirmDialog />
    </div>
  );
}
