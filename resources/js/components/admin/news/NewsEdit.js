import React, { Component } from 'reactn'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import n from '../../../sdk/nprogress'
import $ from 'jquery'
import ax from 'axios'
import { token } from './../helpers/AuthHelper'

export default class NewsEdit extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            disableForm: false,
            loading: true,
            news: {}
        }

        this.handleEditNews = this.handleEditNews.bind(this)
    }

    componentDidMount()
    {
        ax.get(`/api/admin/news/${this.props.match.params.id}`, {
            headers: {
                'admin-token': token(),
            }
        }).then(response => {
            this.setState({
                news: response.data.news,
                loading: false
            })
        }).catch(reason => {
            // console.log(reason)
        })
    }

    handleEditNews(e)
    {
        e.preventDefault()

        let title = $('#title').val()
        let content = $('#content').val()

        if (title === '') {
            toast.error('تیتر خبر نمی تواند خالی باشد.')
            return
        }

        if (content === '') {
            toast.error('متن خبر نمی تواند خالی باشد.')
            return
        }

        this.setState({ disableForm: true })
        n.start()

        ax.put(`/api/admin/news/${this.state.news.id}`, {
            title: title,
            content: content
        }, {
            headers: {
                'admin-token': token(),
            }
        }).then(response => {
            this.setState({
                disableForm: false,
            })
            toast.success('خبر با موفقیت ویرایش شد.')
            n.done()
            this.props.history.push('/news')
        }).catch(reason => {
            if (reason.response.status === 405) {
                let errors = reason.response.data
                let i
                for (let key in errors) {
                    for (i = 0; i < errors[key].length; i++) {
                        toast.error(errors[key][i])
                    }
                }
            }

            this.setState({ disableForm: false })
            n.done()
        })
    }

    render()
    {
        return (
            <div className="admin-marketer-panel-content">
                <div className="card shadow-sm p-3 p-md-4">
                    <h4 className="mb-4">ویرایش خبر</h4>
                    {this.state.loading &&
                        <h1><i className="fa fa-spinner fa-spin"></i></h1>
                    }
                    {!this.state.loading &&
                        <form onSubmit={this.handleEditNews} className="admin-marketer-panel-form">
                            <div className="row align-row">
                                <div className="col-12 mb-3">
                                    <label htmlFor="title">تیتر خبر:</label>
                                    <input type="text" id="title" className="form-control w-50" defaultValue={this.state.news.title}/>
                                </div>
                                <div className="col-12 mb-3">
                                    <label htmlFor="content">متن خبر:</label>
                                    <textarea id="content" className="form-control" rows="5" defaultValue={this.state.news.text ? this.state.news.text : ''}></textarea>
                                </div>
                            </div>
                            <div className="text-left text-sm-right">
                                <button type="submit" disabled={this.state.disableForm ? 'disabled' : ''} className={this.state.disableForm ? 'btn btn-success ml-2 disabled-btn' : 'btn btn-success ml-2'}>
                                    {this.state.disableForm &&
                                        <i className="fa fa-spinner fa-spin ml-2"></i>
                                    }
                                    ویرایش خبر
                                </button>
                                <Link to={'/news'} className="btn btn-danger">انصراف</Link>
                            </div>
                        </form>
                    }
                </div>
            </div>
        )
    }
}
