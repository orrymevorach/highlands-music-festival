import Nav from 'components/nav';
import styles from './layout.module.scss';
import EmailCaptureHeader from 'components/email-capture-form/email-capture-header';
import { useEmailCaptureContext } from '../../context/email-capture-context';
import clsx from 'clsx';

export default function Layout({
  children,
  hasPaddingBottom = true,
  hamburgerMenuColor = 'black',
}) {
  const { hasSubmittedForm } = useEmailCaptureContext();
  return (
    <div
      className={clsx(
        hasPaddingBottom ? styles.layout : '',
        hasSubmittedForm ? '' : styles.layoutMarginTop
      )}
    >
      <Nav hamburgerMenuColor={hamburgerMenuColor} />
      {children}
      <EmailCaptureHeader />
    </div>
  );
}