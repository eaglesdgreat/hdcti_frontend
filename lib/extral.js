{/* <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
    {({ TransitionProps, placement }) => (
    <Grow
    {...TransitionProps}
    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
    >
    <Paper>
    <ClickAwayListener onClickAway={handleClose}>
    <MenuList className={classes.dropdown} autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
    <Link
    href={{
        pathname: `/loan_management/loan_details/[lid]`,
        query: {
        lid: loanId,
        },
    }}
    >
    <a
        style={{
        textDecoration: "none",
        cursor: "pointer",
        }}
    >
        <MenuItem onClick={handleClose}>
        <Typography gutterBottom className={classes.details}>
            View Details
        </Typography>
        </MenuItem>
    </a>
    </Link>

    <Divider light />

    <MenuItem 
    onClick={(e) => {
        handleDialogClick(e)
        // handleClose(e)
    }}
    >
    <Typography gutterBottom className={classes.details}>
        Delete
    </Typography>
    </MenuItem>
    </MenuList>
    </ClickAwayListener>
    </Paper>
    </Grow>
    )}
    </Popper> */}