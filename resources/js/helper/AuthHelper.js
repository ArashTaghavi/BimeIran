import React, { setGlobal } from 'reactn'
import { toast } from 'react-toastify'

export const tokenStorage = sessionStorage

export function is_logged_in() {
    return !!tokenStorage.getItem('x-ref-token')
}

export function login(token, phone, user) {
    tokenStorage.setItem('x-ref-token', token)
    tokenStorage.setItem('phone', phone)
    tokenStorage.setItem('fname', user.fname)
    tokenStorage.setItem('lname', user.lname)
    setGlobal({
        loggedIn: true,
        phone: phone,
        fname: user.fname,
        lname: user.lname
    }, () => {
        window.scrollTo(0, 0)
        toast('خوش آمدید!', {type: 'success'})
    })
}

export function logout() {
    tokenStorage.removeItem('x-ref-token')
    tokenStorage.removeItem('phone')
    setGlobal({
        loggedIn: false
    }, () => {
        toast('با موفقیت از سامانه خارج شدید. ', {type: 'success'})
    })
}

export function token() {
    return !!tokenStorage.getItem('x-ref-token') ? tokenStorage.getItem('x-ref-token') : null
}
