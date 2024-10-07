import styles from './Layout.module.scss';
import EmailCaptureHeader from 'components/shared/EmailCaptureForm/EmailCaptureHeader/EmailCaptureHeader';
import { useEmailCaptureContext } from '../../../context/email-capture-context';
import clsx from 'clsx';
import Header from 'components/shared/Header/Header';
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
