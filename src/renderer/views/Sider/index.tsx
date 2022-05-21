import { Layout, Nav } from '@douyinfe/semi-ui';
import { IconLayers, IconPlus } from '@douyinfe/semi-icons';
import './index.scss';
// import LetterIcon from '../../components/LetterIcon/index';


enum onType {
  onCheckConnect = 'onCheckConnect',
  onAddConnection = 'onAddConnection',
}

export interface ISiderProps {
  onCheckConnect: () => void;
  onAddConnection: (type: string) => void;
}

function AppSider({
  onCheckConnect,
  onAddConnection
} : ISiderProps) {
  const { Sider } = Layout;

  const siderMenus = [
    {
      itemKey: onType.onCheckConnect,
      text: '连接',
      icon: <IconLayers />,
    },
    {
      itemKey: 'connect',
      text: '新增连接',
      icon: <IconPlus />,
      items: [
        {
          itemKey: onType.onAddConnection,
          text: 'MySql'
        }
      ]
    },
  ];

  const onSiderClick = ({itemKey}) => {
    if (itemKey === onType.onCheckConnect) {
      onCheckConnect();
    } else if (itemKey === onType.onAddConnection) {
      onAddConnection('mysql');
    }

  }

  return (
    <Sider>
      <Nav
        className="sider-container"
        items={siderMenus}
        header={{
          logo: (
            <img
              alt="logo"
              src="https://sf6-cdn-tos.douyinstatic.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/webcast_logo.svg"
            />
          ),
          text: 'Z-DB 数据库管理',
          className: 'app-header',
        }}
        footer={{
          collapseButton: true,
        }}
        onClick={onSiderClick}
      />
    </Sider>
  );
}

export default AppSider;
