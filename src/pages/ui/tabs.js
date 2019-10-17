import React from 'react'
import { Card, Button, Tabs, message, Icon } from 'antd'
import './ui.less'
const TabPane = Tabs.TabPane;
export default class Buttons extends React.Component {

    newTabIndex = 0;
    handlecallback = (key)=>{
        message.info("hi,您选择了页签:"+key)
    }
    componentWillMount(){
        const panes =[
            {
                title:'Tab 1',
                content: 'Tab 1',
                key: '1'
            },
            {
                title:'Tab 2',
                content: 'Tab 2',
                key: '2'
            },
            {
                title:'Tab 3',
                content: 'Tab 3',
                key: '3'
            },
        ]
        this.setState({
            activekey: panes[0].key,
            panes
        })
    }
    onChange = (activekey)=>{
        this.setState({
            activekey
        })
    }
    onEdit = (targetkey, action)=>{
        this[action](targetkey);
    }
    add = () => {
        const panes = this.state.panes;
        const activekey = `newTab${this.newTabIndex++}`;
        panes.push({ title: 'New Tab',content: 'New Tab Pane', key: activekey});
        this.setState({ panes, activekey });
    }
    remove = (targetkey) =>{
        let activekey = this.state.activekey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if(pane.key === targetkey){
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetkey);
        if(lastIndex >= 0 && activekey === targetkey){
            activekey = panes[lastIndex].key;
        }
        this.setState({ panes, activekey});
    }
    render(){
        return(
            <div>
                <Card title="Tab页签" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                        <TabPane tab="Tab 1" key="1">欢迎学习react课程</TabPane>
                        <TabPane tab="Tab 2" key="2" disabled>欢迎学习react课程</TabPane>
                        <TabPane tab="Tab 3" key="3">React是一门非常受欢迎的MV*框架</TabPane>
                    </Tabs>
                </Card>
                <Card title="Tab带图页签" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                        <TabPane tab={<span><Icon type="plus"/>Tab 1</span>} key="1">欢迎学习react课程</TabPane>
                        <TabPane tab={<span><Icon type="edit"/>Tab 2</span>} key="2">欢迎学习react课程</TabPane>
                        <TabPane tab={<span><Icon type="delete"/>Tab 3</span>} key="3">React是一门非常受欢迎的MV*框架</TabPane>
                    </Tabs>
                </Card>
                <Card title="Tab带图页签" className="card-wrap">
                    <Tabs 
                        onChange={this.onChange}
                        activekey={this.state.activekey}
                        defaultActiveKey="1" 
                        type="editable-card"
                        onEdit={this.onEdit}
                        >
                        {
                            this.state.panes.map((panel)=>{
                                return <TabPane
                                    tab={panel.title}
                                    key={panel.key}
                                />
                            })
                        }
                    </Tabs>
                </Card>
            </div>
        );

    }
}