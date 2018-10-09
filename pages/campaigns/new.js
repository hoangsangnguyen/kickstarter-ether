import React, { Component } from 'react';
import { Button, Form, Input, Message, Checkbox, FormGroup, Dropdown, Container, Embed, TextArea } from 'semantic-ui-react';
import { Player } from 'video-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';
import { Common } from '../../utils/common';
import axios from 'axios';
import ReactPlayer from 'react-player';

import {
    DateInput,
    TimeInput,
    DateTimeInput,
    DatesRangeInput
} from 'semantic-ui-calendar-react';

class CampaignNew extends Component {
    state = {
        errorMessage: '',
        loading: false,
        name: '',
        category: '',
        description: '',
        minimumContribution: '',
        goal: '',
        investmentDescription: '',
        imageFile: '',
        imagePreviewUrl: '',
        videoFile: '',
        videoPreviewUrl: '',
    };

    categories = [
        {
            text: 'Art',
            value: 'art',
        },
        {
            text: 'Design & Tech',
            value: 'design-tech',
        },
        {
            text: 'Comics & Illustration',
            value: 'comics-illustration',
        },
        {
            text: 'Games',
            value: 'games',
        },
        {
            text: 'Food & Craft',
            value: 'food-craft',
        },
        {
            text: 'Music',
            value: 'music',
        },
        {
            text: 'Publishing',
            value: 'publishing',
        },
        {
            text: 'Film',
            value: 'film',
        },
    ]

    handleChange = (event, { name, value }) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }
    }

    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({ loading: true, errorMessage: '' });
        console.log('name ' + this.state.name + ' \ncategory : ' + this.state.category
            + '\nMinimum : ' + this.state.minimumContribution
            + '\nDes : ' + this.state.description
            + '\nGoal : ' + this.state.goal
            + '\nInvestDes : ' + this.state.investmentDescription)
            + '\nImageFile : ' + this.state.imageFile
            + '\nVideoFile : ' + this.state.videoFile;

        try {
            const user = JSON.parse(localStorage.getItem("user"))
            if (user == null) {
                Router.pushRoute("/author/login")
                return
            }

            const userWalletAddress = user.walletAddress
            console.log("User walletAdress : ", userWalletAddress)

            // const accounts = await web3.eth.getAccounts();
            // console.log('account : ' + accounts);
            await factory.methods
                .createCampaign(
                    this.state.name,
                    this.state.category,
                    web3.utils.toWei(this.state.minimumContribution, 'ether'),
                    this.state.description,
                    this.state.imageFile,
                    this.state.videoFile,
                    // 'https://pbs.twimg.com/profile_images/626149701189042177/LWpxKEv3_400x400.png',
                    // 'https://www.youtube.com/watch?v=1njYc9ZO6WQ',
                    web3.utils.toWei(this.state.goal, 'ether'),
                    this.state.investmentDescription)
                .send({
                    from: userWalletAddress
                });

            Router.pushRoute('/');
        } catch (err) {
            console.log(err.message);
            this.setState({ errorMessage: err.message });
        }

        console.log('Out')
        this.setState({ loading: false });



    };

    _handleDeleteImage(e) {
        e.preventDefault();
        this.setState({ imageFile: '', imagePreviewUrl: '' });
    }

    _handleDeleteVideo(e) {
        e.preventDefault();
        this.setState({ videoFile: '', videoPreviewUrl: '' });
    }

    async _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = async () => {
            await this.setState({
                imageFile: file,
                imagePreviewUrl: reader.result
            });
        };

        reader.readAsDataURL(file)
    }

    _handleVideoChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                videoFile: file,
                videoPreviewUrl: reader.result
            });
        }


        reader.readAsDataURL(file)
    }

    render() {
       
        // console.log('image file : ', this.state.imagePreviewUrl);
        // console.log('video file : ', this.state.videoPreviewUrl);

        // let { imagePreviewUrl } = this.state;
        // let $imagePreview = null;
        // if (imagePreviewUrl) {
        //     $imagePreview = (
        //         <Container>
        //             <img
        //                 src={imagePreviewUrl}
        //                 height='300px'
        //                 width='300px' />
        //             <br />
        //             <Button
        //                 basic color='red'
        //                 onClick={(e) => this._handleDeleteImage(e)}>Delete Image</Button>

        //         </Container>
        //     );
        // } else {
        //     //$imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        // }

        // let { videoPreviewUrl } = this.state;
        // let $videoPreview = null;
        // if (videoPreviewUrl) {
        //     $videoPreview = (
        //         <Container>
        //             <ReactPlayer url={videoPreviewUrl} controls />
        //             <br />
        //             <Button
        //                 basic color='red'
        //                 onClick={(e) => this._handleDeleteVideo(e)}>Delete Video</Button>

        //         </Container>
        //     );
        // } else {
        //     //$imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        // }

        return (
            <Layout>
                <h5>Create new campaign</h5>

                <Form className="segment" onSubmit={this.onSubmit} error={!!this.state.errorMessage}>

                    <Form.Field required>
                        <label>Category</label>
                        <Dropdown placeholder='Select category..'
                            fluid selection
                            options={this.categories}
                            onChange={(event, { value }) =>
                                this.setState({ category: value })}
                            />
                    </Form.Field>

                    <Form.Field required>
                        <label>Campaign name</label>
                        <Input
                            required
                            value={this.state.name}
                            onChange={event =>
                                this.setState({ name: event.target.value })}
                        />
                    </Form.Field>

                    <Form.Field required>
                        <label>Minimum Contribution</label>
                        <Input
                            label="eth"
                            labelPosition="right"
                            value={this.state.minimumContribution}
                            onChange={event =>
                                this.setState({ minimumContribution: event.target.value })}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Campaign Description</label>
                        <TextArea
                            autoHeight
                            value={this.state.description}
                            onChange={event =>
                                this.setState({ description: event.target.value })}
                        />
                    </Form.Field>

                    <Form.Field required>
                        <label>Goal</label>
                        <Input
                            label="wei"
                            labelPosition="right"
                            value={this.state.goal}
                            onChange={event =>
                                this.setState({ goal: event.target.value })}
                        />
                    </Form.Field>

                    {/* <Form.Field>
                        <label>Deadline</label>
                        <DateInput
                            name="deadline"
                            placeholder="Date"
                            value={this.state.deadline}
                            iconPosition="left"
                            onChange={(event, { value }) =>
                                this.setState({ deadline: value })} />
                    </Form.Field> */}

                    <Form.Field>
                        <label>Investment Description</label>
                        <TextArea
                            autoHeight
                            value={this.state.investmentDescription}
                            onChange={event =>
                                this.setState({ investmentDescription: event.target.value })}
                        />
                    </Form.Field>

                    <Form.Field required>
                        <label>Image</label>
                        <Input
                            value={this.state.imageFile}
                            onChange={event =>
                                this.setState({ imageFile: event.target.value })}
                        />
                        {/* <input className="fileInput"
                            type="file"
                            onChange={(e) => this._handleImageChange(e)} /> */}

                        {/* <div className="imgPreview">
                            {$imagePreview}
                        </div> */}
                    </Form.Field>

                    <Form.Field required>
                        <label>Video</label>
                        <Input
                            value={this.state.videoFile}
                            onChange={event =>
                                this.setState({ videoFile: event.target.value })}
                        />
                        {/* <input className="fileInput"
                            type="file"
                            onChange={(e) => this._handleVideoChange(e)} />

                        <div className="videoPreview">
                            {$videoPreview}
                        </div> */}
                    </Form.Field>

                    {/* <Form.Field>
                        <Checkbox label='I agree to the Terms and Conditions' />
                    </Form.Field> */}

                    <Message error header="Oops!" content={this.state.errorMessage} />


                    <Button primary loading={this.state.loading}>Create</Button>
                </Form>
            </Layout>
        );
    }
}

export default CampaignNew;