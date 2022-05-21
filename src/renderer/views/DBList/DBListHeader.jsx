
import {
    Button,
    Typography,
    Input
} from "@douyinfe/semi-ui";
import { IconPlusCircle, IconSearch } from "@douyinfe/semi-icons";
import "./index.css"

function DbListHeader({onAddConnect}) {

    const { Text } = Typography;

    return (
        <div className="db-list-header">
            <Button theme='borderless' onClick={onAddConnect} icon={<IconPlusCircle />} > 新增连接 </Button>
            <div className="db-list-header-right">
                <Input suffix={<IconSearch />} showClear  placeholder="请输入连接信息" ></Input>
            </div>
        </div>
    );
}

export default DbListHeader;