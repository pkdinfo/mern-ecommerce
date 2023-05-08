import React from 'react'
import Link from 'next/link';

const DropDownItems = (props) => {
    let {href, children, ...rest} =props;
  return (
    <Link href={href} legacyBehavior={true}>
    <a {...rest}>{children}</a>
    </Link>
  )
}
export default DropDownItems