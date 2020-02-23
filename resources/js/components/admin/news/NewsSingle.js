import React, { Component } from 'reactn'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import ax from 'axios'
import { token } from './../helpers/AuthHelper'

export default class NewsSingle extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            loading: true,
            news: {}
        }
    }

    componentDidMount()
    {
        ax.get(`/api/admin/news/${this.props.match.params.id}`, {
            headers: {
                'admin-token': token(),
            }
        }).then(response => {
            this.setState({
                loading: false,
                news: response.data.news
            })
        }).catch(reason => {
            // console.log(reason)
        })
    }

    render()
    {
        return (
            <div className="admin-marketer-panel-content">
                <div className="card shadow-sm p-3 p-md-4">
                    {this.state.loading &&
                        <h4 className="mb-4"><i className="fa fa-spinner fa-spin"></i></h4>
                    }
                    {!this.state.loading &&
                        <h4 className="mb-4">{this.state.news.title}</h4>
                    }
                    <div className="row align-row mb-3">
                        {this.state.loading &&
                            <div className="col-12"><i className="fa fa-spinner fa-spin"></i></div>
                        }
                        {!this.state.loading &&
                            <div className="col-12">{this.state.news.text}</div>
                        }
                    </div>
                    <div className="text-left">
                        <Link to={'/news'} className="btn btn-primary">بازگشت به لیست اخبار</Link>
                    </div>
                </div>
            </div>
        )
    }
}
