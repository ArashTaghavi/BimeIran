import React from 'react'
import { toast } from 'react-toastify'

const NotFound = (props) =>
{
    toast.error('404: صفحه مورد نظر یافت نشد.')

    props.history.push('/')

    return null
}

export default NotFound
