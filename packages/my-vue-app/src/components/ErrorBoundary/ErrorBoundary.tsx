import React from 'react'

interface ErrorBoundaryProps {
  fallback?: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI

    console.log('getDerivedStateFromError', error)
    return { hasError: true };
  }

  componentDidMount () {
    this.setState({
      hasError: false
    })
  }


  componentDidCatch(error, errorInfo) {
    console.log('componentDidCatch', error, errorInfo)
  }

  render() {
    // const {
    //   children,
    //   fallback
    // } = this.props

    console.log( this.state.hasError)
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return this.props.fallback || this.props.children
    }


    return this.props.children
  }
}