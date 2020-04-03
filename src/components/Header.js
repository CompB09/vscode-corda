import React from 'react';
import '../styles/Header.css';
import { Button, Popper, Paper, Grow, ClickAwayListener, MenuList, MenuItem } from '@material-ui/core';
import * as ActionType from '../store/Actions'
import { connect } from 'react-redux';
import CrdaLogo from './crda-logo.svg';

const Header = (props) => {

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
      setOpen(prevOpen => !prevOpen);
    };
  
    const handleClose = event => {
      setOpen(false);
    };

  
    function handleListKeyDown(event) {
      if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
      }
    }
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
      if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
      }

      prevOpen.current = open;
    }, [open]);

    const serverLocation = (props.localNodes ? "Local Server" : "Remote Server");
  
    return(
      <div className="Header">
          <div>
                <img src={CrdaLogo} width="100%" alt="Corda Logo" className="Logo"/>
                <div className="profile">
                  <Button variant="outlined" ref={anchorRef} onClick={handleToggle}>
                    {props.profile.name} - ({serverLocation})
                  </Button>
                  <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
                        >
                          <Paper>
                            <div style={{padding: 10}}>
                                <span style={{display: "block", paddingBottom: 3}}>
                                  {props.profile.name}
                                </span>
                                <span style={{fontSize: 12, display: "block"}}>{props.profile.city}, {props.profile.country}</span>
                            </div>
                            <hr style={{margin: 0}}/>
                            <ClickAwayListener onClickAway={handleClose}>
                              <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown} style={{padding: 0}}>
                                {Object.keys(props.gradleNodes).map(function(key, index) {

                                    const nodeName = key.match("O=(.*),L")[1];
                                    if (nodeName != props.profile.name)
                                      return (<MenuItem>{nodeName}</MenuItem>)
                                    else return null; // don't list CURRENT NODE
                                })}
                                <hr />
                                <MenuItem onClick={props.onLogout}>Logout</MenuItem>
                              </MenuList>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Popper>
                </div>
          </div>
      </div>
    );
}

const mapStateToProps = state => {
  return {
    profile: state.common.profile,
    gradleNodes: state.common.gradleNodesList,
    localNodes: state.common.gradleNodesSet,
    peers: state.explorer.netWorkMap.peers
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onLogout: () => dispatch({type: ActionType.LOGOUT}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);