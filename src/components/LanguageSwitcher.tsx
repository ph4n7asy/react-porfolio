import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, Box } from '@mui/material';
import ReactCountryFlag from 'react-country-flag';

interface LanguageConfig {
    [key: string]: {
        countryCode: string;
    };
}

const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const currentLangCode = i18n.language.split('-')[0].toLowerCase();

    const languages: LanguageConfig = {
        en: { countryCode: 'GB' },
        ru: { countryCode: 'RU' }
    };

    const currentLanguage = currentLangCode in languages ? currentLangCode : 'en';
    const otherLanguage = currentLanguage === 'en' ? 'ru' : 'en';

    const changeLanguage = () => {
        i18n.changeLanguage(otherLanguage);
        localStorage.setItem('selectedLanguage', otherLanguage);
        setIsOpen(false);
    };

    return (
        <Box sx={{
            position: 'relative',
            display: 'inline-block',
            height: 32
        }}>
            {/* Основной флаг */}
            <IconButton
                onClick={() => setIsOpen(!isOpen)}
                sx={{
                    p: 0.5,
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    transition: 'transform 0.2s',
                    '&:hover': {
                        transform: 'scale(1.1)',
                        backgroundColor: 'transparent'
                    }
                }}
            >
                <ReactCountryFlag
                    countryCode={languages[currentLanguage].countryCode}
                    svg
                    style={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        objectFit: 'cover',
                        display: 'block',
                        opacity: 1,
                        transition: 'opacity 0.2s'
                    }}
                    alt={"flag-" + languages[currentLanguage].countryCode}
                />
            </IconButton>

            <Box
                sx={{
                    position: 'absolute',
                    top: 32,
                    right: 0,
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? 'translateY(0)' : 'translateY(-10px)',
                    transition: 'all 0.2s ease',
                    pointerEvents: isOpen ? 'auto' : 'none',
                    zIndex: 1
                }}
            >
                <IconButton
                    onClick={changeLanguage}
                    sx={{
                        p: 0.5,
                        transition: 'transform 0.2s',
                        '&:hover': {
                            transform: 'scale(1.1)',
                            backgroundColor: 'transparent'
                        }
                    }}
                >
                    <ReactCountryFlag
                        countryCode={languages[otherLanguage].countryCode}
                        svg
                        style={{
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            objectFit: 'cover',
                            display: 'block',
                            opacity: 0.9,
                            transition: 'opacity 0.2s'
                        }}
                    />
                </IconButton>
            </Box>
        </Box>
    );
};

export default LanguageSwitcher;