/**
 * Format Utilities
 * Reusable formatting functions for numbers, currency, dates, etc.
 */

/**
 * Format number as currency with thousand separators and decimal places
 * @param value - The number to format
 * @param currency - Currency symbol (default: '$')
 * @param decimals - Number of decimal places (default: 2)
 * @param locale - Locale for formatting (default: 'en-US')
 * @returns Formatted currency string
 * 
 * @example
 * formatCurrency(1234.5) // "$1,234.50"
 * formatCurrency(10000, '€') // "€10,000.00"
 * formatCurrency(999.99, '$', 0) // "$1,000"
 */
export const formatCurrency = (
    value: string | null | undefined,
    currency: string = '$',
    decimals: number = 2,
    locale: string = 'en-US'
): string => {
    if (value === null || value === undefined || isNaN(Number(value))) {
        return `${currency}0.00`;
    }

    const formatted = Number(value).toLocaleString(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    });

    return `${currency}${formatted}`;
};

/**
 * Format number with thousand separators
 * @param value - The number to format
 * @param decimals - Number of decimal places (default: 0)
 * @param locale - Locale for formatting (default: 'en-US')
 * @returns Formatted number string
 * 
 * @example
 * formatNumber(1234567) // "1,234,567"
 * formatNumber(1234.567, 2) // "1,234.57"
 */
export const formatNumber = (
    value: number | null | undefined,
    decimals: number = 0,
    locale: string = 'en-US'
): string => {
    if (value === null || value === undefined || isNaN(value)) {
        return '0';
    }

    return value.toLocaleString(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    });
};

/**
 * Format number as percentage
 * @param value - The number to format (0.15 = 15%)
 * @param decimals - Number of decimal places (default: 0)
 * @returns Formatted percentage string
 * 
 * @example
 * formatPercent(0.15) // "15%"
 * formatPercent(0.8567, 2) // "85.67%"
 */
export const formatPercent = (
    value: number | null | undefined,
    decimals: number = 0
): string => {
    if (value === null || value === undefined || isNaN(value)) {
        return '0%';
    }

    const percent = value * 100;
    return `${percent.toFixed(decimals)}%`;
};

/**
 * Format file size in human readable format
 * @param bytes - File size in bytes
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted file size string
 * 
 * @example
 * formatFileSize(1024) // "1.00 KB"
 * formatFileSize(1048576) // "1.00 MB"
 * formatFileSize(1234567890) // "1.15 GB"
 */
export const formatFileSize = (
    bytes: number | null | undefined,
    decimals: number = 2
): string => {
    if (bytes === null || bytes === undefined || bytes === 0) {
        return '0 Bytes';
    }

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
};

/**
 * Format date in various formats
 * @param date - Date to format (Date object, timestamp, or ISO string)
 * @param format - Format type ('short', 'long', 'full', 'time', 'datetime')
 * @param locale - Locale for formatting (default: 'en-US')
 * @returns Formatted date string
 * 
 * @example
 * formatDate(new Date(), 'short') // "1/15/2025"
 * formatDate(new Date(), 'long') // "January 15, 2025"
 * formatDate(new Date(), 'full') // "Wednesday, January 15, 2025"
 * formatDate(new Date(), 'time') // "2:30 PM"
 * formatDate(new Date(), 'datetime') // "Jan 15, 2025, 2:30 PM"
 */
export const formatDate = (
    date: Date | string | number | null | undefined,
    format: 'short' | 'long' | 'full' | 'time' | 'datetime' = 'short',
    locale: string = 'en-US'
): string => {
    if (!date) return '';

    const dateObj = typeof date === 'string' || typeof date === 'number' 
        ? new Date(date) 
        : date;

    if (isNaN(dateObj.getTime())) return '';

    const optionsMap: Record<'short' | 'long' | 'full' | 'time' | 'datetime', Intl.DateTimeFormatOptions> = {
        short: { year: 'numeric', month: 'numeric', day: 'numeric' },
        long: { year: 'numeric', month: 'long', day: 'numeric' },
        full: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
        time: { hour: 'numeric', minute: '2-digit', hour12: true },
        datetime: {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        },
    };
    const options = optionsMap[format];

    return new Intl.DateTimeFormat(locale, options).format(dateObj);
};

/**
 * Format phone number
 * @param phone - Phone number string
 * @param format - Format type ('us', 'international')
 * @returns Formatted phone number
 * 
 * @example
 * formatPhone('1234567890') // "(123) 456-7890"
 * formatPhone('1234567890', 'international') // "+1 123 456 7890"
 */
export const formatPhone = (
    phone: string | null | undefined,
    format: 'us' | 'international' = 'us'
): string => {
    if (!phone) return '';

    const cleaned = phone.replace(/\D/g, '');

    if (format === 'us' && cleaned.length === 10) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }

    if (format === 'international' && cleaned.length >= 10) {
        const country = cleaned.slice(0, -10);
        const area = cleaned.slice(-10, -7);
        const prefix = cleaned.slice(-7, -4);
        const line = cleaned.slice(-4);
        return `+${country || '1'} ${area} ${prefix} ${line}`;
    }

    return phone;
};

/**
 * Truncate string with ellipsis
 * @param str - String to truncate
 * @param length - Maximum length
 * @param suffix - Suffix to add (default: '...')
 * @returns Truncated string
 * 
 * @example
 * formatTruncate('Hello World', 8) // "Hello..."
 */
export const formatTruncate = (
    str: string | null | undefined,
    length: number,
    suffix: string = '...'
): string => {
    if (!str) return '';
    if (str.length <= length) return str;
    return str.slice(0, length - suffix.length) + suffix;
};

/**
 * Capitalize first letter of string
 * @param str - String to capitalize
 * @returns Capitalized string
 * 
 * @example
 * capitalize('hello world') // "Hello world"
 */
export const capitalize = (str: string | null | undefined): string => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Convert string to title case
 * @param str - String to convert
 * @returns Title cased string
 * 
 * @example
 * toTitleCase('hello world') // "Hello World"
 */
export const toTitleCase = (str: string | null | undefined): string => {
    if (!str) return '';
    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};