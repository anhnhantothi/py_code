import React, { useState, useEffect, useCallback } from 'react';
import { DataTable, DataTablePageEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { ConfirmDialog } from 'primereact/confirmdialog';
import moment from 'moment';
import debounce from 'lodash.debounce';
import { generateFakeUsers, User } from './model';
import { paginatorTemplate, rowsPerPageOptions } from '../../untils/common';
import { Button } from 'primereact/button';




export default function CustomerManage() {
  const [customers, setCustomers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);
  const [dialogName, setDialogName] = useState<string>("Chỉnh sửa người dùng");
  const [visible, setVisible] = useState<boolean>(false);
  const [customer, setCustomer] = useState<User>();
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
    { field: 'vip', header: 'VIP' },
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

  function handleEdit(rowData: User): void {
    setCustomer(rowData)
    setVisible(true)
  }

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
          <Column key={col.field} field={col.field} body={col.body} header={col.header} style={{ minWidth: '12rem' }} frozen={col.frozen} />
        ))}
      </DataTable>
      <ConfirmDialog />

      {/* <Dialog header={dialogName} visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }} closeIcon={true} icons={<i className='pi pi-close text-amber-400'></i>}>
        <CustomerDetail customerModel={customer!}
          handleCancel={() => { setVisible(false) }}
          handleSave={_updateUser}
        />
      </Dialog> */}
    </div>
  );
}
