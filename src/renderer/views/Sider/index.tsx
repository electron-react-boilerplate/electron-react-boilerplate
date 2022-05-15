import { Layout, Nav } from '@douyinfe/semi-ui';
import { IconUser, IconStar, IconSetting } from '@douyinfe/semi-icons';
import './index.scss';
import LetterIcon from '../../components/LetterIcon/index';

function AppSider(_props: any) {
  const { Sider } = Layout;

  return (
    <Sider>
      <Nav
        className="sider-container"
        bodyStyle={{ height: 300 }}
        items={[
          { itemKey: 'user', text: '用户管理', icon: <LetterIcon letter="A" /> },
          { itemKey: 'union', text: '公会中心', icon: <LetterIcon letter="B" />  },
          {
            text: '任务平台',
            icon: <LetterIcon letter="C" />,
            itemKey: 'job',
            items: ['任务管理', '用户任务查询'],
          },
        ]}
        header={{
          logo: (
            <img src="https://sf6-cdn-tos.douyinstatic.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/webcast_logo.svg" />
          ),
          text: 'z-app',
        }}
        footer={{
          collapseButton: true,
        }}
        onSelect={(data) => console.log('trigger onSelect: ', data)}
        onClick={(data) => console.log('trigger onClick: ', data)}
      />
    </Sider>
  );
}

export default AppSider;
