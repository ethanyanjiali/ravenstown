import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Modal, Button } from 'antd';
import * as web3Actions from '../../../web3/actions';
import SideNavItem from '../../components/SideNavItem/SideNavItem';
import './SideNavContainer.css';
import ravenLogo from '../../../assets/logo.svg';
import ethLogo from '../../../assets/eth-logo.png';
import { BASE_URL } from '../../constants';

const mapStateToProps = state => ({
  isWeb3Loaded: state.web3.isWeb3Loaded,
});

class SideNavContainer extends Component {

  state = {
    aboutModalVisible: false,
  }

  handleClickNavItem = (navId) => {
    const { dispatch, history } = this.props;
    switch (navId) {
      case 'logout':
        dispatch(web3Actions.logoutMetaMask());
        break;
      case 'square':
        history.push(BASE_URL +'/');
        break;
      default:
        console.log(navId);
    }
  }

  handleClickAbout = () => {
    this.setState({
      aboutModalVisible: true,
    });
  }

  render() {
    const { isWeb3Loaded } = this.props;
    const { aboutModalVisible } = this.state;

    return (
      <div className='sidenav-container'>
        <div className='sidenav-logo'>
          <img className='raven-logo' src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNzg1cHgi%0D%0AIGhlaWdodD0iNTMzcHgiIHZpZXdCb3g9IjAgMCA3ODUgNTMzIiB2ZXJzaW9uPSIxLjEiIHhtbG5z%0D%0APSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMu%0D%0Ab3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0Ny4xICg0NTQyMikg%0D%0ALSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+R3Jv%0D%0AdXA8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVm%0D%0Acz48L2RlZnM+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0i%0D%0AMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iR3JvdXAi%0D%0AIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEuMDAwMDAwLCAwLjAwMDAwMCkiPgogICAgICAgICAgICA8%0D%0AcGF0aCBkPSJNMTE1Ljc2OTIzMSwyOTQgQzExOC4xMDA0NzgsMzE1LjE3ODg4OCAxMjIuMTIxMzEx%0D%0ALDMzMC41MTIyMjEgMTI3LjgzMTczMSwzNDAgQzEzMy41NDIxNSwzNDkuNDg3Nzc5IDE0OS4wMDY4%0D%0AOTQsMzY1LjE1NDQ0NSAxNzQuMjI1OTYyLDM4NyBDMTk4LjEzOTI0Miw0MDIuMzMzMDE0IDIxNi4z%0D%0AODc2MzksNDExLjY2NjM0NyAyMjguOTcxMTU0LDQxNSBDMjgyLjczNjA2Miw0MjkuMjQzNTIgMzI5%0D%0ALjc0MjIxNiw0MjYgMzU2LjA5MTM0Niw0MjYgQzM4Ny45NTY3MzcsNDI2IDQyMy4zOTI2NTQsNDIy%0D%0ALjgyMDE0MSA0NjQuNjUzODQ2LDM5NyBDNDkzLjQxODI2OSwzNzkgNTI3LDM0OCA1NDAuNzQwMzg1%0D%0ALDMxMyBDNTUxLjc3NTE1NCwyODQuODkxODQgNTYwLjM1MDk2MiwyNTYgNTY0LDIzNyBDNTY3LjY0%0D%0AOTAzOCwyMTggNTc2LDEzMi44NDUyMTIgNTc2LDkzIEM1NzYsNjYuNDM2NTI1NiA1NzMuMjE2MzQ2%0D%0ALDQ2LjEwMzE5MjMgNTY3LjY0OTAzOCwzMiBDNTQ0Ljc3NzUwNywyOC42MDc4MjcyIDUyOC4zODQ4%0D%0ANzksMjguNjA3ODI3MiA1MTguNDcxMTU0LDMyIEM1MTcuMTI4MzgsMzIuNDU5NDU2IDUxNi4yMTY2%0D%0AMzMsMjQuNjI3MTUyOSA1MTEuOTc1OTYyLDE3IEM1MDcuMTA3NDEsOC4yNDM1NjAwNCA0OTguNzkx%0D%0ANjMxLC0wLjQyMzI2MTI2NCA0OTYuMjAxOTIzLDEgQzQ5My4wMTcxNjUsMi43NTAyOTEwMiA0OTMu%0D%0ANDE4MjY5LDIzIDQ5My40MTgyNjksMjYgQzQ5My40MTgyNjksMjcuNTg4MzA2IDQ2Ny42NzQ5MzQs%0D%0AMTQuNjYxMTE4OSA0NjQuNjUzODQ2LDE3IEM0NjMuNDEzNDk5LDE3Ljk2MDI1ODIgNDY1Ljk4MDY1%0D%0ANiwyNS4xNDY4MjUyIDQ3Mi4wNzY5MjMsMzIgQzQ3OS4xNzgxMjEsMzkuOTgyODc2NyA0OTAuMDU5%0D%0AOTg5LDQ3LjcyOTYzODUgNDg5LjcwNjczMSw0OCBDNDc1LjI0MjE4NSw1OS4wNzAyNiA0NTQuODI4%0D%0ANzIzLDg0LjQwMzU5MzQgNDI4LjQ2NjM0NiwxMjQgTDQwMi40ODU1NzcsMTM3IEMzNjEuNDk4ODU0%0D%0ALDEyMy45OTE4MjkgMzI5LjY3MDMyOCwxMTYuMzI1MTYyIDMwNywxMTQgQzI2OCwxMTAgMjM5LjIw%0D%0AMTQ0NSwxMTMuNTcwMiAyMjguOTcxMTU0LDExNCBDMjE2LjQ4NDU5LDExNC41MjQ1OTEgMTIxLjYw%0D%0AMDk2MiwxMjIgMTE1Ljc2OTIzMSwxMzEgQzEwOS45Mzc1LDE0MCAxMzMuNTg2NTM4LDE0OCAxNTQs%0D%0AMTU4IEMxNjYuMzU1MzEsMTY0LjA1MjUzIDExMS4yMTIxNTQsMTYyLjA0MzQ3NSAxMDcuNDE4MjY5%0D%0ALDE2OSBDMTAxLjE1MjE3OCwxODAuNDg5NjAyIDEzNS41Mzc3OTMsMTk3LjMzOTAwNCAxMjcuODMx%0D%0ANzMxLDE5OSBDMTE0Ljk0NDE3NiwyMDEuNzc3ODM2IDEzMC4wMjY3MTEsMjE4LjQ1NTQ2IDEyNy44%0D%0AMzE3MzEsMjIyIEMxMjIuMzk3MDgzLDIzMC43NzYwODIgMTA4LjE1Nzc2LDIyNC4zMTMyMzggMTA3%0D%0ALjQxODI2OSwyMjkuMTQ4MTU1IEMxMDYuNDIxMDI1LDIzNS42NjgzMDUgMTIyLjYzMzk3OSwyNDEu%0D%0AMzg5MzI5IDEwNy40MTgyNjksMjQ0IEM5My4yMDU0MjA2LDI0Ni40Mzg2MDMgODAuMzQ4NjcwNiwy%0D%0ANDIuMjc3OTg0IDY5LjM3NSwyNDQgQzEyLjQyMDM2ODIsMjUyLjkzNzQ2NyAzLDI1MSAwLDI1OCBD%0D%0AMCwyNzQgMi4zMzEzNjU4MiwzMDguMTEwNDQyIDE1LDMwNyBDMjMuMzkzMzQxMywzMDYuMjY0MyAz%0D%0ANy4xOTExMDc0LDMwNi41Mjc5NzQgNjQuNzM1NTc2OSwyOTQgQzY5LjMxMzc0MzEsMjkxLjkxNzcy%0D%0ANiA3LjQzMDIzNjEyLDMzMS40MTI4MzMgMTgsMzI3IEMyMC4wMjc1MjM4LDMyNi4xNTM1MTcgNDIu%0D%0ANTcwMTM5NiwzNzMuMzUwMTg3IDU5LjE2ODI2OTIsMzYzIEM2OS4wNzA5NzYyLDM1Ni44MjQ5MTUg%0D%0AODcuOTM3OTYzMywzMzMuODI0OTE1IDExNS43NjkyMzEsMjk0IFoiIGlkPSJQYXRoIiBzdHJva2U9%0D%0AIiM5Nzk3OTciIGZpbGw9IiMxNTE1MTUiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTU2%0D%0ANywzMiBDNjA1LjgzNTY1NCwzMiA2NTguNzI0MDg5LDM1LjIxMTEwMzkgNzAyLjYyOTQ4NCw1NiBD%0D%0ANzE2LjA0NzQyMSw2Mi4zNTMyOTkxIDczNy41Mjg0MzUsNzMuNzU1NjM0MSA3NTcuNTY4MDA5LDk3%0D%0AIEM3NjcuMjQ5NjA0LDEwOC4yMjk5MDcgNzg2Ljc1NDEsMTMyIDc4Mi40NjIwMjgsMTM4IEM3Nzku%0D%0ANjAwNjQ2LDE0MiA3MTAuMzU1MjE0LDEzMy42NjY2NjcgNTc0LjcyNTczLDExMyIgaWQ9IlBhdGgt%0D%0AMiIgZmlsbD0iI0YwODcwMCI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNNzU4LjQyNjQy%0D%0AMywxMzcgQzc1OC40MjY0MjMsMTQ3LjE5NjM0NyA3NTEuMjcyOTY5LDE1NS4xOTYzNDcgNzM2Ljk2%0D%0ANjA2MiwxNjEgQzcwOC4zMjUyMzcsMTcyLjYxODI2MyA3MTAuNjM3Njk1LDE3MC4yODYyMzYgNjg0%0D%0ALjYwMjc4LDE3NCBDNjQyLjU0MDQ3MiwxODAgNjUwLjI4MzY2NCwxNzYuNzE0MjI3IDYyNy45NDc0%0D%0AMjYsMTc4IEM2MjAuMDk0NzQ2LDE3OC40NTIwMzUgNjAwLjkyMzQ5LDE3Ny4xMTg3MDIgNTcwLjQz%0D%0AMzY1OCwxNzQgTDU3NC43MjU3MywxMTMiIGlkPSJQYXRoLTMiIGZpbGw9IiNENTY5MDAiPjwvcGF0%0D%0AaD4KICAgICAgICAgICAgPHBhdGggZD0iTTI5Miw0MjUgQzI5Miw0NDUuODc4NzIzIDI5Mi4yODUy%0D%0AMDksNDgzLjEyNTU2NyAzMDEsNTA3IEMzMDUuOTIwMjk0LDUyMC40NzkyOTQgMzE5LDUzNCAzMjQs%0D%0ANTMyIEMzMjcuMzMzMzMzLDUzMC42NjY2NjcgMzI0LjY2NjY2Nyw1MjIuMzMzMzMzIDMxNiw1MDcg%0D%0AQzMyOS4zMzMzMzMsNTIxIDMzNy4zMzMzMzMsNTI3LjMzMzMzMyAzNDAsNTI2IEMzNDIuNjY2NjY3%0D%0ALDUyNC42NjY2NjcgMzM5LDUxNiAzMjksNTAwIEMzNDUuNjY2NjY3LDUwOS4zMzMzMzMgMzU1LDUx%0D%0AMyAzNTcsNTExIEMzNTksNTA5IDM1NS4zMzMzMzMsNTAzLjY2NjY2NyAzNDYsNDk1IEwzMzgsNDg4%0D%0AIEMzMzAuOTA4NzI5LDQ4NC4zMzk4MzYgMzI2LjU3NTM5Niw0ODIuMDA2NTAzIDMyNSw0ODEgQzMy%0D%0AMy40MjQ2MDQsNDc5Ljk5MzQ5NyAzMTguMDkxMjcxLDQ3OC44MjY4MyAzMDksNDc3LjUgTDMwNyw0%0D%0AMjUiIGlkPSJQYXRoLTQiIGZpbGw9IiNFNjdCMDAiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGgg%0D%0AZD0iTTM4NS4yMDExMiw0MjQgQzM4NC4wNzI3MDksNDQyLjgyMjU0MyAzODMuNzM5Mzc1LDQ1Ni4x%0D%0ANTU4NzcgMzg0LjIwMTEyLDQ2NCBDMzg0LjY0NjgyNiw0NzEuNTcxNjUyIDM4Ny4xNDYzMDcsNDgw%0D%0ALjgzNTU2IDM4OS4yMDExMiw0ODcgQzM5Ny4wNzMwNDQsNTEwLjYxNTc3MSA0NDAuMzc5Nzk3LDUy%0D%0AOS4wNzIwNjIgNDM5LjIwMTEyLDUyMiBDNDM4Ljg2MDQzNCw1MTkuOTU1ODg0IDQzMC4xOTM3Njcs%0D%0ANTExLjI4OTIxNyA0MTMuMjAxMTIsNDk2IEM0MzYuOTc0NjQ5LDUwNy4wNDkxMTkgNDQ5LjY0MTMx%0D%0ANSw1MTEuNzE1Nzg1IDQ1MS4yMDExMiw1MTAgQzQ1MS44ODU1MDksNTA5LjI0NzE3MiA0NDEuMzcz%0D%0ANTE4LDUwMS41ODA1MDUgNDE5LjY2NTE0Nyw0ODcgQzQ0MS4zNzgyMjUsNDk0LjEyNDYxMiA0NTIu%0D%0AODkwMjE2LDQ5Ni40NTc5NDUgNDU0LjIwMTEyLDQ5NCBDNDU1LjUxMjAyNCw0OTEuNTQyMDU1IDQ0%0D%0ANC44NDUzNTcsNDg1Ljg3NTM4OCA0MjIuMjAxMTIsNDc3IEw0MDEuMjAxMTIsNDcxIEwzOTYuMjAx%0D%0AMTIsNDIzIiBpZD0iUGF0aC01IiBmaWxsPSIjRTY3QjAwIj48L3BhdGg+CiAgICAgICAgICAgIDxw%0D%0AYXRoIGQ9Ik0zOTQuNTM4Mzg4LDEzOSBDNDAxLjEyNTYxOSwxOTYuODM4Mjg2IDQwMS4xMjU2MTks%0D%0AMjM3LjE3MTYyIDM5NC41MzgzODgsMjYwIEMzODQuNjU3NTQzLDI5NC4yNDI1NyAzODQuODY0ODMs%0D%0AMzAwLjgzNzc1NCAzNDAuNDM0NDMxLDMxOCBDMjk2LjAwNDAzMiwzMzUuMTYyMjQ2IDI3MS43NTA1%0D%0ANzksMzM0LjUwMzkwNSAyMzQuMDI5OTgxLDMyMiBDMTk2LjMwOTM4MiwzMDkuNDk2MDk1IDE4MS43%0D%0AOTM5MjgsMzEyLjQ0OTcwNyAxNjcuMzAxNzY3LDI1MSBDMTU3LjY0MDMyNiwyMTAuMDMzNTI5IDE2%0D%0ANC4yNTMwMzIsMTY5LjAzMzUyOSAxODcuMTM5ODg0LDEyOCIgaWQ9IlBhdGgtNiIgZmlsbD0iIzA4%0D%0AMDQwMyI+PC9wYXRoPgogICAgICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsIiBmaWxsPSIjRkZGRkZG%0D%0AIiBjeD0iNTIwIiBjeT0iOTciIHI9IjQ3Ij48L2NpcmNsZT4KICAgICAgICAgICAgPGVsbGlwc2Ug%0D%0AaWQ9Ik92YWwtMiIgZmlsbD0iIzZDM0UxNCIgY3g9IjUyOS41IiBjeT0iOTYiIHJ4PSIzMC41IiBy%0D%0AeT0iMzIiPjwvZWxsaXBzZT4KICAgICAgICAgICAgPGVsbGlwc2UgaWQ9Ik92YWwtMyIgZmlsbD0i%0D%0AI0ZGRkZGRiIgY3g9IjU0MC41IiBjeT0iODkiIHJ4PSI5LjUiIHJ5PSIxMCI+PC9lbGxpcHNlPgog%0D%0AICAgICAgICAgICA8cGF0aCBkPSJNNTczLDM4IEM2MTUuMTA0NDkyLDM1LjQ1MTcyOTUgNjU0Ljcy%0D%0AMTYzNCw0MS44MDQ2NDEzIDY5MS44NTE0MjUsNTcuMDU4NzM1NCBDNzI4Ljk4MTIxNyw3Mi4zMTI4%0D%0AMjk2IDc1NS42OTc0MDgsOTUuMjkzMjUxMSA3NzIsMTI2IEM3NDkuMDk3MjEzLDEwMi4wMTM4NDcg%0D%0ANzMzLjIyMDI0NCw4Ny4xNjMyNTQ3IDcyNC4zNjkwOTMsODEuNDQ4MjI0MiBDNzA4LjM1NDAzNSw3%0D%0AMS4xMDc1ODY2IDY5MC40NDE3NjEsNjYuMzQyMzI2OCA2NzcuNjI0OTQ2LDYyLjEzOTg3ODkgQzY1%0D%0ANC4xODI3OTUsNTQuNDUzNTM3OSA2MTkuMzA3ODE0LDUxLjQwNjkxMTYgNTczLDUzIEw1NzMsMzgg%0D%0AWiIgaWQ9IlBhdGgtNyIgZmlsbD0iI0Y0QUM2MyI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwv%0D%0AZz4KPC9zdmc+' alt='logo' />
          <h2 className='raven-name'>RAVENSTOWN</h2>
          <div className='version-label'>Pre-Alpha 0.3.1</div>
        </div>
        <SideNavItem label='Town Square' navId='square' onClick={ this.handleClickNavItem } />
        <SideNavItem label='About' onClick={ this.handleClickAbout } />
        { isWeb3Loaded && <SideNavItem label='Log Out' navId='logout' onClick={ this.handleClickNavItem } /> }
        <Modal
          title='About Us'
          visible={ aboutModalVisible }
          footer={null}
          closable={ false }
        >
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
          >
            <a style={{ textAlign: 'center' }} href='https://www.ethereum.org/' target='_blank' rel='noopener noreferrer'><img style={{ width: '40%' }} src='https://github.com/ethanyanjiali/ravenstown/blob/master/src/assets/eth-logo.png?raw=true' alt='ethLogo' /></a>
            <p>This project is powered by ethereum. We aim to build a decentralized space for people to talk freely. If you have any interest, or questions about upcoming new features, please contact me via liyanjia92 at gmail.com</p>
            <Button onClick={ () => this.setState({ aboutModalVisible: false })}>OK</Button>
          </div>
        </Modal>
      </div>
    );
  }
}

SideNavContainer.propTypes = {
  isWeb3Loaded: PropTypes.bool,
  history: PropTypes.object.isRequired,
};

SideNavContainer.defaultProps = {
  isWeb3Loaded: false,
};

export default withRouter(connect(mapStateToProps)(SideNavContainer));
