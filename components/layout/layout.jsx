import styles from './layout.module.scss';
import EmailCaptureHeader from 'components/email-capture-form/email-capture-header';
import { useEmailCaptureContext } from '../../context/email-capture-context';
import clsx from 'clsx';
import Header from 'components/shared/header/header';

export default function Layout({
  children,
  hasPaddingBottom = true,
  hideHeaderMargin = false,
}) {
  const { hasSubmittedForm, showEmailCapture } = useEmailCaptureContext();
  return (
    <div
      className={clsx(
        hasPaddingBottom ? styles.layout : '',
        hasSubmittedForm || !showEmailCapture ? '' : styles.layoutMarginTop
      )}
    >
      <Header hideBottomMargin={hideHeaderMargin} />
      {children}
      {showEmailCapture && <EmailCaptureHeader />}
    </div>
  );
}
