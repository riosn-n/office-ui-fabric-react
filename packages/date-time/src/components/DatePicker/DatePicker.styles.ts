import { IDatePickerStyleProps, IDatePickerStyles } from './DatePicker.types';
import { IStyle, normalize, getGlobalClassNames, FontSizes } from '@uifabric/styling';

const GlobalClassNames = {
  root: 'ms-DatePicker',
  callout: 'ms-DatePicker-callout',
  withLabel: 'ms-DatePicker-event--with-label',
  withoutLabel: 'ms-DatePicker-event--without-label',
  disabled: 'msDatePickerDisabled '
};

export const styles = (props: IDatePickerStyleProps): IDatePickerStyles => {
  const { className, theme, disabled, label, isDatePickerShown } = props;
  const { palette, semanticColors } = theme;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const DatePickerIcon: IStyle = {
    color: palette.neutralSecondary,
    fontSize: FontSizes.icon,
    lineHeight: '18px',
    pointerEvents: 'none',
    position: 'absolute',
    right: '4px',
    padding: '5px'
  };

  return {
    root: [classNames.root, theme.fonts.large, isDatePickerShown && 'is-open', normalize, className],
    textField: [
      {
        position: 'relative',
        selectors: {
          '& input[readonly]': {
            cursor: 'pointer'
          },
          input: {
            selectors: {
              '::-ms-clear': {
                display: 'none'
              }
            }
          }
        }
      },
      disabled && {
        selectors: {
          '& input[readonly]': {
            cursor: 'default'
          }
        }
      }
    ],
    callout: [classNames.callout],
    icon: [
      DatePickerIcon,
      !label && [classNames.withoutLabel, { paddingTop: '7px' }],
      label && [classNames.withLabel, { paddingBottom: '5px' }],
      !disabled && [
        classNames.disabled,
        {
          pointerEvents: 'initial',
          cursor: 'pointer'
        }
      ],
      disabled && {
        color: semanticColors.disabledText,
        cursor: 'default'
      }
    ]
  };
};
