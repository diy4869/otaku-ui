import React from 'react'

interface props {
    loading?: boolean
}


export default function Container (props: props) {
    const { loading } = props

    if (loading) {
        return (
            <div>正在努力加载中</div>
        )
    } else {
        return (
            <div>hello world</div>
        )
    }
}
