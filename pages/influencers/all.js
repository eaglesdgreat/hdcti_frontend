import React, { useState } from 'react'
import {
  Box,
  Divider,
} from '@material-ui/core';
import axios from 'axios';
import useSWR, { mutate } from 'swr'
import ReactLoading from 'react-loading'
import moment from 'moment'
import clsx from 'clsx';
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/router'

import { isAuthenticated } from '../../lib/auth.helper'
import PrivateRoute from '../../Components/PrivateRoute'
import TableLayout from '../../Components/Tables'
import Search from '../../Components/Search'
import DeleteDialog from '../../Components/DeleteDialog'
import AllInfluencersTable from '../../Components/influencers/AllInfluencersTable';

const tableNav = [
  {
    active: false,
    label: 'stats',
    link: '/influencers/stats',
  },
  {
    active: true,
    label: 'all',
    link: '/influencers/all',
  },
]

const fetcher = async (...arg) => {
  const [url, token] = arg

  const response = await axios.get(
    url,
    { headers: { authenticate: token } }
  )

  return response.data
}


const influencerData = () => {
  const url = `${process.env.BACKEND_URL}/api/all-influencers`
  const token = isAuthenticated().authToken

  const { data, error } = useSWR([url, token], fetcher, { shouldRetryOnError: false })

  return {
    influencers: data,
    isLoading: !error && !data,
    isError: error
  }
}

export default function All() {
  const router = useRouter();

  // initializing state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState('')
  const [displaySearch, setdisplaySearch] = useState([])
  const [displayFilter, setDisplayFilter] = useState([])
  const [selected, setSelected] = useState('')
  const [selectSort, setSelectSort] = useState('')
  const [checked, setChecked] = useState([]);
  const [showRemoveButton, setShowRemoveButton] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const { enqueueSnackbar } = useSnackbar();

  // Fetching data from backend with SWR
  const { influencers, isLoading, isError } = influencerData();
  // console.log(influencers.map(x => x.customer_earnings.map(y => y.amount).reduce((a, b) => a = Number(a) + Number(b), 0)))

  const refreshData = () => router.replace(router.asPath);

  // handler for filtering data
  const handleFilter = (arg) => {
    // const data = [...products.wholesaleProducts.rows, ...products.products.rows]
    if (arg === 'wholesaler') {
      const items = influencers.filter(inf => inf.platform === 'wholesaler')
      // console.log(items)
      setDisplayFilter([...items]);
      setPage(0)
    } else if (arg === 'vendor') {
      const items = influencers.filter(inf => inf.platform === 'vendor')
      setDisplayFilter([...items]);
      setPage(0);
    } else {
      setDisplayFilter([]);
    }

    // console.log(displayFilter, arg)
  }

  // handling sorting data
  const onSortClick = (arg) => {
    const data = ((search.length < 1 && displayFilter.length === 0)
      ? influencers
      : search.length >= 1 ? displaySearch
        : displayFilter.length > 0 ? displayFilter
          : ''
    )

    // sort date ascending order
    if (arg === 'date_asc') {
      const dateAsc = data.sort((a, b) => new Date(...(moment(a.createdAt).format('DD/MM/YYYY')).split('/').reverse())
        - new Date(...(moment(b.createdAt).format('DD/MM/YYYY')).split('/').reverse()))

      console.log(dateAsc);
      setDisplayFilter(dateAsc);
      setPage(0);
    }

    // sorting date descending order
    if (arg === 'date_desc') {
      const dateDesc = data.sort((a, b) => new Date(...(moment(b.createdAt).format('DD/MM/YYYY')).split('/').reverse())
        - new Date(...(moment(a.createdAt).format('DD/MM/YYYY')).split('/').reverse()))

      setDisplayFilter(dateDesc);
      setPage(0);
    }

    //  sorting amount in ascending order
    if (arg === 'amount_asc') {
      const amountasc = data.sort((a, b) => (
        (a.customer_earnings.map(y => y.amount)
          .reduce((a, b) => a = Number(a) + Number(b), 0) >
          b.customer_earnings.map(y => y.amount)
            .reduce((a, b) => a = Number(a) + Number(b), 0))) ? -1 :
        ((b.customer_earnings.map(y => y.amount).
          reduce((a, b) => a = Number(a) + Number(b), 0) >
          a.customer_earnings.map(y => y.amount)
            .reduce((a, b) => a = Number(a) + Number(b), 0) ? 1 : 0))
      );

      setDisplayFilter(amountasc);
      setPage(0);
    }

    //  sorting amount in descending order
    if (arg === 'amount_desc') {
      const amountdesc = data.sort((a, b) => (
        (a.customer_earnings.map(y => y.amount)
          .reduce((a, b) => a = Number(a) + Number(b), 0) >
          b.customer_earnings.map(y => y.amount)
            .reduce((a, b) => a = Number(a) + Number(b), 0))) ? 1 :
        ((b.customer_earnings.map(y => y.amount).
          reduce((a, b) => a = Number(a) + Number(b), 0) >
          a.customer_earnings.map(y => y.amount)
            .reduce((a, b) => a = Number(a) + Number(b), 0) ? -1 : 0))
      );

      setDisplayFilter(amountdesc);
      setPage(0);
    }

    //  sorting leaderboard(Sales revenue) in ascending order
    if (arg === 'sales_asc') {
      const leaderasc = data.sort((a, b) => (
        (a.customer_earnings.map(y => y.paid_to_earn.amount)
          .reduce((a, b) => a = Number(a) + Number(b), 0) >
          b.customer_earnings.map(y => y.paid_to_earn.amount)
            .reduce((a, b) => a = Number(a) + Number(b), 0))) ? -1 :
        ((b.customer_earnings.map(y => y.paid_to_earn.amount).
          reduce((a, b) => a = Number(a) + Number(b), 0) >
          a.customer_earnings.map(y => y.paid_to_earn.amount)
            .reduce((a, b) => a = Number(a) + Number(b), 0) ? 1 : 0))
      );

      setDisplayFilter(leaderasc);
      setPage(0);
    }

    //  sorting Leaderboard(Sales revenue) in descending order
    if (arg === 'sales_desc') {
      const leaderdesc = data.sort((a, b) => (
        (a.customer_earnings.map(y => y.paid_to_earn.amount)
          .reduce((a, b) => a = Number(a) + Number(b), 0) >
          b.customer_earnings.map(y => y.paid_to_earn.amount)
            .reduce((a, b) => a = Number(a) + Number(b), 0))) ? 1 :
        ((b.customer_earnings.map(y => y.paid_to_earn.amount).
          reduce((a, b) => a = Number(a) + Number(b), 0) >
          a.customer_earnings.map(y => y.paid_to_earn.amount)
            .reduce((a, b) => a = Number(a) + Number(b), 0) ? -1 : 0))
      );

      setDisplayFilter(leaderdesc);
      setPage(0);
    }

    if (arg === 'clear') {
      setDisplayFilter(influencers);
      refreshData();
      setPage(0);
    }

    if (arg !== 'date_asc' && arg !== 'date_desc' && arg !== 'amount_asc' && arg !== 'amount_desc') {
      setDisplayFilter([]);
      refreshData();
      setPage(0);
    }
  }

  console.log(displayFilter);

  // seacrh handler and display
  const onSearchChange = (e) => {
    e.preventDefault();
    const { value } = e.target
    setSearch(value);

    const data = ((search.length < 1 && displayFilter.length === 0)
      ? influencers
      : search.length >= 1 ? displaySearch
        : displayFilter.length > 0 ? displayFilter
          : ''
    )

    let currentList = data.map(customer => {
      // console.log({...item})
      return { ...customer }
    })

    if (search !== '') {
      let newList = []

      newList = currentList.filter(customer => {
        const name = (`${customer.firstName} ${customer.lastName} ${customer.email}`).toLowerCase()
        return name.includes(search.toLowerCase())
      })

      setdisplaySearch(newList)
      setPage(0)
    } else {
      setdisplaySearch(influencers)
    }
    // console.log(displaySearch)
  }

  // checkbox selections
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = influencers.map((influencer) => influencer.id);
      setChecked(newSelecteds);
      setShowRemoveButton(true);
      return;
    }
    setChecked([]);
    setShowRemoveButton(false);
  };


  const handleClick = (event, id) => {
    const selectedIndex = checked.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(checked, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(checked.slice(1));
    } else if (selectedIndex === checked.length - 1) {
      newSelected = newSelected.concat(checked.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        checked.slice(0, selectedIndex),
        checked.slice(selectedIndex + 1),
      );
    }
    setChecked(newSelected);


    if (newSelected.length > 0) {
      setShowRemoveButton(true);
    } else {
      setShowRemoveButton(false);
    }
  };

  const isChecked = (id) => checked.indexOf(id) !== -1;

  // Handle delete
  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleDelete = async () => {
    // const body = checked;

    const token = isAuthenticated().authToken;
    const url = `${process.env.BACKEND_URL}/api/delete-influencer/${checked}`

    try {
      const response = await axios.delete(
        url,
        { headers: { authenticate: token } }
      )

      if (response.data.success) {
        enqueueSnackbar("Removed Successfully", {
          variant: 'success',
        });
        setChecked([]);
        setOpenDeleteDialog(false);
        router.reload(window.location.pathname)
      }
    } catch (error) {
      console.log(error);
    }

    console.log("Deleted Successfully");
  }

  return (
    <TableLayout tableNav={tableNav} name="Influencers" currentPath="/influencers/all">
      <Search
        search={search} selectSort={selectSort} onSearchChange={onSearchChange}
        onSelected={(arg) => {
          setSelected(arg)
          handleFilter(arg)
        }}
        onSortClick={(arg) => {
          setSelectSort(arg)
          onSortClick(arg)
        }}
        showRemoveButton={showRemoveButton} handleDialogOpen={handleOpenDeleteDialog}
      />

      <DeleteDialog
        title="Permanently Delete Influencer?"
        content="This is irreversible and will permanently remove influencer(s) from the database"
        action1="No"
        action2="Yes"
        openDeleteDialog={openDeleteDialog}
        closeDeleteDialog={handleCloseDeleteDialog}
        handleDelete={handleDelete}
      />

      <Divider style={{ background: "#EAEAEA" }} />

      <Box>

      </Box>

      <Box>
        {isError ? (<PrivateRoute isError={isError} />)
          : isLoading ?
            <Box
              display="flex"
              justifyContent="center"
              style={{
                margin: 'auto',
                paddingLeft: 100,
                paddingRight: 100,
                paddingTop: 150,
                paddingBottom: 150,
              }}
            >
              <ReactLoading type={'spinningBubbles'} color={"#FF5C00"} height={'20%'} width={'10%'} />
            </Box> :
            <AllInfluencersTable
              data={influencers}
              checked={checked}
              isChecked={isChecked}
              search={search}
              displaySearch={displaySearch}
              displayFilter={displayFilter}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              handleClick={handleClick}
              handleSelectAllClick={handleSelectAllClick}
            />
        }
      </Box>
    </TableLayout>
  )
}