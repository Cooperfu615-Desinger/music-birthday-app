import Papa from 'papaparse';

export const FIXED_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRI4bfz4oW4L_JVdTQ1m8AVlXUp8AgavrNrZvvoDfL3fUSUFAaJr8-QpQ9ivxgs_b1a1M1CLMgnbvnv/pub?output=csv";

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

                    const validData = rawData.map(row => {
                        if (row.length < 2) return null;
                        const dateStr = row[0];
                        if (!dateStr) return null;

                        let month, day;
                        const chineseMatch = typeof dateStr === 'string' ? dateStr.match(/(\d+)\s*月\s*(\d+)/) : null;

                        if (chineseMatch) {
                            month = chineseMatch[1];
                            day = chineseMatch[2];
                        } else {
                            const d = new Date(dateStr);
                            if (!isNaN(d.getTime())) {
                                month = d.getMonth() + 1;
                                day = d.getDate();
                            } else {
                                const simpleMatch = typeof dateStr === 'string' ? dateStr.match(/(\d+)[\/\-](\d+)/) : null;
                                if (simpleMatch) {
                                    month = simpleMatch[1];
                                    day = simpleMatch[2];
                                } else return null;
                            }
                        }

                        month = month.toString().padStart(2, '0');
                        day = day.toString().padStart(2, '0');

                        let year = '2000';
                        if (row[3]) {
                            const y = parseInt(row[3]);
                            if (!isNaN(y)) year = y.toString();
                        }

                        return {
                            name: row[1],
                            birthDate: `${year}-${month}-${day}`,
                            displayDate: `${year} / ${month} / ${day}`,
                            bio: row[4] ? `${row[4]} (${row[2] || ''})` : `來自${row[2] || '未知地區'}的藝人`,
                            spotifyUrl: (row[6] && row[6].startsWith('http')) ? row[6] : null,
                            appleUrl: (row[7] && row[7].startsWith('http')) ? row[7] : null
                        };
                    }).filter(item => item !== null);
                    resolve(validData);
                } else {
                    reject(new Error("無資料"));
                }
            },
            error: (err) => reject(err)
        });
    });
};
