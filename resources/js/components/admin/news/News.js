import React, { Component, Fragment } from 'reactn'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import FeatherIcon from 'feather-icons-react'
import { toast } from 'react-toastify'
import n from '../../../sdk/nprogress'
import $ from 'jquery'
import ax from 'axios'
import { token } from './../helpers/AuthHelper'

export default class News extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            news: {
                columns: [
                    {
                        label: 'شناسه',
                        field: 'id',
                        sort: 'asc'
                    },
                    {
                        label: 'عنوان',
                        field: 'title',
                        sort: 'asc'
                    },
                    {
                        label: 'متن خبر',
                        field: 'content',
                        sort: 'asc'
                    },
                    {
                        label: 'عملیات',
                        field: 'actions',
                        sort: 'asc'
                    },
                ],
                rows: [
                    {
                        id: <i className="fa fa-spinner fa-spin"></i>,
                        title: <i className="fa fa-spinner fa-spin"></i>,
                        content: <i className="fa fa-spinner fa-spin"></i>,
                        actions: <i className="fa fa-spinner fa-spin"></i>,
                    }
                ]
            },
        }

        this.handleDeleteNews = this.handleDeleteNews.bind(this)
    }

    componentDidMount()
    {
        ax.get('/api/admin/news', {
            headers: {
                'admin-token': token(),
            }
        }).then(response => {
            const news = response.data.news

            news.map(khabar => {
                khabar.actions = <Fragment>
                                 <Link to={`/news/${khabar.id}`} className="btn btn-info ml-2 mb-2 mb-md-0"><FeatherIcon icon="eye"/></Link>
                                 <Link to={`/news/${khabar.id}/edit`} className="btn btn-warning ml-2"><FeatherIcon icon="edit"/></Link>
                                 <button data-id={khabar.id} className="btn btn-danger" onClick={this.handleDeleteNews}><FeatherIcon icon="trash-2"/></button>
                                 </Fragment>
                khabar.text = khabar.text.length > 70 ? khabar.text.slice(0,70) + '...' : khabar.text
            })

            this.setState({
                ...this.state,
                news: {
                    ...this.state.news,
                    rows: news
                }
            }, () => {
            })
        }).catch(reason => {
            // console.log(reason)
        })
    }

    handleDeleteNews(e)
    {
        e.preventDefault()

        let deleteConfirm = confirm("آیا از حذف این خبر اطمینان دارید؟")

        if (deleteConfirm)
        {
            n.start()

            let id = e.currentTarget.dataset.id

            ax.delete(`/api/admin/news/${id}`, {
                headers: {
                    'admin-token': token(),
                }
            }).then(response => {
                const news = this.state.news.rows

                const newData = news.filter(khabar => {
                    return khabar.id != id
                })

                this.setState({
                    ...this.state,
                    news: {
                        ...this.state.news,
                        rows: newData
                    }
                }, () => {
                })
                toast.success('خبر مورد نظر با موفقیت حذف گردید.')
                n.done()
            }).catch(reason => {
                // console.log(reason.response)
                // n.done()
            })
        }
    }

    render()
    {
        return (
            <div className="admin-marketer-panel-content">
                <div className="card shadow-sm p-3 p-md-4">
                    <div className="row align-row mb-4">
                        <div className="col-6">
                            <h4 className="mb-0">لیست اخبار</h4>
                        </div>
                        <div className="col-6 text-left">
                            <Link to={'/news/create'} className="btn btn-primary">
                                <FeatherIcon icon="plus" className="ml-2"/>
                                افزودن خبر جدید
                            </Link>
                        </div>
                    </div>
                    <MDBDataTable
                        striped
                        barReverse
                        btn
                        responsive
                        entriesLabel="تعداد نتایج در هر صفحه"
                        info={false}
                        paginationLabel={["قبلی", "بعدی"]}
                        searchLabel="جستجو"
                        className="responsive-table news-table"
                        data={this.state.news}
                    />
                </div>
            </div>
        )
    }
}
