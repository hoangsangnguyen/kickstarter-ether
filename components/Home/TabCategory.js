import React, { Component } from 'react'
import { Tab, Segment } from 'semantic-ui-react'
import TabCategoryDetail from './TabCategoryDetail';
import factory from '../../ethereum/factory';

const panes = (campaigns) => [
  { menuItem: 'Art', value: 'art' , render: () => <TabCategoryDetail  campaigns = {campaigns}></TabCategoryDetail> },
  { menuItem: 'Design $ Tech',value: 'design-tech' , render: () => <TabCategoryDetail  campaigns = {campaigns}></TabCategoryDetail> },
  { menuItem: 'Comics & illustration', value: 'comics-illustration' , render: () => <TabCategoryDetail  campaigns = {campaigns}></TabCategoryDetail> },
  { menuItem: 'Games', value: 'games' , render: () => <TabCategoryDetail  campaigns = {campaigns}></TabCategoryDetail> },
  { menuItem: 'Food & Craft', value: 'food-craft' , render: () => <TabCategoryDetail  campaigns = {campaigns}></TabCategoryDetail> },
  { menuItem: 'Music', value: 'music' , render: () => <TabCategoryDetail  campaigns = {campaigns}></TabCategoryDetail> },
  { menuItem: 'Publishing', value: 'publishing' , render: () => <TabCategoryDetail  campaigns = {campaigns}></TabCategoryDetail> },
  { menuItem: 'Film', value: 'film' , render: () => <TabCategoryDetail  campaigns = {campaigns}></TabCategoryDetail> },
];

class TabCategory extends Component {

  state = {
    campaigns : [],
    activeIndex : '0'
  }
  
  handleChange = async (e, data) => {
    let category = data.panes[data.activeIndex].value;
    const campaigns = await factory.methods.getDeployedCampaign(category.toLowerCase()).call();
    this.setState({campaigns : campaigns, activeIndex : data.activeIndex});
    // localStorage.setItem("activeIndex") = data.activeIndex;
  };

  async componentDidMount() {
    let category = this.tab.props.panes[0].menuItem;
    let activeIndex = parseInt(localStorage.getItem("activeIndex")) || 0;
    const campaigns = await factory.methods.getDeployedCampaign(category.toLowerCase()).call();
    this.setState({campaigns : campaigns, activeIndex : activeIndex});
  }

  render() {
    console.log("render", this.state)
    return (
      <div>
        <Tab ref={(tab) => this.tab = tab} panes={panes(this.state)} onTabChange={this.handleChange} renderActiveOnly={true}/>
      </div>
    )
  }

}

// const TabCampaign = () => (
//   <Tab panes={panes} />
// )

export default TabCategory