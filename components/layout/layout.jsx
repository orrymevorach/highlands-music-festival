import styles from './layout.module.scss';
import EmailCaptureHeader from 'components/email-capture-form/email-capture-header';
import { useEmailCaptureContext } from '../../context/email-capture-context';
import clsx from 'clsx';
import Header from 'components/shared/header/header';
import { formatFestivalDate } from 'utils/utils';

export default function Layout({
  children,
  hasPaddingBottom = true,
  hideHeaderMargin = false,
  festivalDate = '',
}) {
  const { hasSubmittedForm, showEmailCapture } = useEmailCaptureContext();
  const formattedFestivalDate = festivalDate;
  // ? formatFestivalDate(festivalDate)
  // : '';
  return (
    <div
      className={clsx(
        hasPaddingBottom ? styles.layout : '',
        hasSubmittedForm || !showEmailCapture ? '' : styles.layoutMarginTop
      )}
    >
      <Header
        hideBottomMargin={hideHeaderMargin}
        festivalDate={formattedFestivalDate}
      />
      {children}
      {showEmailCapture && <EmailCaptureHeader />}
    </div>
  );
}
