import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement, useMemo, cloneElement } from 'react';

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  activeClassName: string;
}

const ActiveLink: React.FC<ActiveLinkProps> = ({ children, activeClassName, ...rest }) => {
  const { asPath } = useRouter();


  const className = useMemo(() => {
    return asPath === rest.href ? activeClassName : '';
  }, [asPath]);

  return (
    <Link {...rest}>
      {cloneElement(children, {
        className,
      })}
    </Link>
  );
}

export default ActiveLink;