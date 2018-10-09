import React, { Component } from 'react'
import { Tab, Segment } from 'semantic-ui-react'
import TabCampaignDetail from './TabCampaignDetail'
import Campaign from '../../ethereum/campaign'

const panes = (description, investmentIntroduction, address) => [
    { menuItem: 'Description', value: 'description' , render: () => <TabCampaignDetail  info = {description}></TabCampaignDetail> },
    { menuItem: 'Invesment Introduction',value:'investment-introduction'  , render: () => <TabCampaignDetail  info = {investmentIntroduction}></TabCampaignDetail> },
    { menuItem: 'Q & A', value: 'q&a' , render: () => <TabCampaignDetail  info = {address}></TabCampaignDetail> },
];

class TabCampaign extends Component {
    // handleChange = async (e, data) => {
    //     let category = data.panes[data.activeIndex].value;
    //     const campaigns = await factory.methods.getDeployedCampaign(category.toLowerCase()).call();
    //     this.setState({campaigns : campaigns, activeIndex : data.activeIndex});
    //     // localStorage.setItem("activeIndex") = data.activeIndex;
    // };
    
    state = {
      description : '',
      investmentIntroduction : ''
    }

    async componentDidMount() {
      const campaign = Campaign(this.props.address)
      
      const description = await campaign.methods.mDescription().call();
      const investmentIntroduction = await campaign.methods.mInvestmentDescription().call();
      this.setState({description, investmentIntroduction});
      
    }

    render() {
        console.log('Des : ', this.state.description)
        console.log('Inves : ', this.state.investmentIntroduction)
        
        return (
          <div>
            <Tab ref={(tab) => this.tab = tab} panes={panes(this.state.description, this.state.investmentIntroduction, this.props.address)}  renderActiveOnly={true}/>
          </div>
        )
      }
}

export default TabCampaign