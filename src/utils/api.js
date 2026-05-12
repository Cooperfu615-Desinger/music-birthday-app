import Papa from 'papaparse';
import { getDaysInMonth } from './date.js';

export const FIXED_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRI4bfz4oW4L_JVdTQ1m8AVlXUp8AgavrNrZvvoDfL3fUSUFAaJr8-QpQ9ivxgs_b1a1M1CLMgnbvnv/pub?output=csv";

const padDatePart = (value) => value.toString().padStart(2, '0');

const parseDateParts = (dateValue) => {
    if (!dateValue) return null;

    const dateStr = dateValue.toString().trim();
    const chineseMatch = dateStr.match(/(\d+)\s*月\s*(\d+)/);

    if (chineseMatch) {
        return {
            month: Number(chineseMatch[1]),
            day: Number(chineseMatch[2]),
        };
    }

    const simpleMatch = dateStr.match(/(\d+)[/-](\d+)/);

    if (simpleMatch) {
        return {
            month: Number(simpleMatch[1]),
            day: Number(simpleMatch[2]),
        };
    }

    const parsedDate = new Date(dateStr);

    if (!Number.isNaN(parsedDate.getTime())) {
        return {
            month: parsedDate.getMonth() + 1,
            day: parsedDate.getDate(),
        };
    }

    return null;
};

const isValidUrl = (value) => typeof value === 'string' && value.trim().startsWith('http');

export const parseSingerRow = (row) => {
    if (!Array.isArray(row) || row.length < 2) return null;

    const dateParts = parseDateParts(row[0]);
    const name = row[1]?.toString().trim();

    if (!dateParts || !name) return null;
    if (
        dateParts.month < 1 ||
        dateParts.month > 12 ||
        dateParts.day < 1 ||
        dateParts.day > getDaysInMonth(dateParts.month)
    ) {
        return null;
    }

    const month = padDatePart(dateParts.month);
    const day = padDatePart(dateParts.day);
    const parsedYear = Number.parseInt(row[3], 10);
    const year = Number.isNaN(parsedYear) ? '2000' : parsedYear.toString();
    const region = row[2]?.toString().trim() || '';
    const description = row[4]?.toString().trim();

    return {
        name,
        birthDate: `${year}-${month}-${day}`,
        displayDate: `${year} / ${month} / ${day}`,
        bio: description ? `${description} (${region})` : `來自${region || '未知地區'}的藝人`,
        spotifyUrl: isValidUrl(row[6]) ? row[6].trim() : null,
        appleUrl: isValidUrl(row[7]) ? row[7].trim() : null
    };
};

export const fetchSheetData = () => {
    return new Promise((resolve, reject) => {
        Papa.parse(FIXED_CSV_URL, {
            download: true,
            header: false,
            skipEmptyLines: true,
            complete: (results) => {
                const rawData = results.data;
                if (rawData && rawData.length > 0) {
                    if (rawData[0][0] && typeof rawData[0][0] === 'string' && rawData[0][0].trim().startsWith("<!DOCTYPE")) {
                        reject(new Error("連結無效或權限不足"));
                        return;
                    }

                    const validData = rawData.map(parseSingerRow).filter(Boolean);
                    resolve(validData);
                } else {
                    reject(new Error("無資料"));
                }
            },
            error: (err) => reject(err)
        });
    });
};
