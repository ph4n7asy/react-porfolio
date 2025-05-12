import React from "react";
import styled from "styled-components";
import { Telegram } from "@mui/icons-material";
import { Link } from "@mui/material";
import { useTranslation } from 'react-i18next';
import {BioType, MenuItems} from "../../types"

const FooterContainer = styled.div`
  width: 100%;
  padding: 2rem 0;
  display: flex;
  justify-content: center;
  z-index: 10;
  position: relative;
`;

const FooterWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: center;
  padding: 1rem;
  color: ${({ theme }) => theme.text_primary};
`;

const Logo = styled.div`
  font-weight: 600;
  font-size: 20px;
  color: ${({ theme }) => theme.primary};

  @media (max-width: 405px) {
    font-size: 15px;
  }
`;

const Nav = styled.ul`
  width: 100%;
  max-width: 800px;
  margin-top: 0.5rem;
  display: flex;
  flex-direction: row;
  gap: 2rem;
  justify-content: center;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    text-align: center;
    font-size: 12px;
  }
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  text-decoration: none;
  font-size: 1.2rem;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.text_primary} !important;
  text-decoration: none;
  font-size: 1.2rem !important;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.primary} !important;
  }
`;

const SocialMediaIcons = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const SocialMediaIcon = styled.a`
  display: inline-block;
  margin: 0 1rem;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text_primary};
  transition: color 0.2s ease-in-out;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const Copyright = styled.p`
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text_primary};
  text-align: center;
`;

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const bio = t('contact', { returnObjects: true }) as BioType;
  const menuItems = t('menuItems', { returnObjects: true }) as MenuItems;

  return (
      <FooterContainer>
        <FooterWrapper>
          <Logo>Frontend Artist → Backend Scientist</Logo>
          <Nav aria-label="Footer navigation">
            <NavLink href="#About" aria-label="About section">{menuItems.about}</NavLink>
            <NavLink href="#Skills" aria-label="Skills section">{menuItems.skills}</NavLink>
            <NavLink href="#Experience" aria-label="Experience section">{menuItems.experience}</NavLink>
            <NavLink href="#Projects" aria-label="Projects section">{menuItems.projects}</NavLink>
          </Nav>
          <SocialMediaIcons>
            <SocialMediaIcon
                href={bio.telegram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
            >
              <Telegram />
            </SocialMediaIcon>
            <StyledLink
                href={bio.vk}
                underline="none"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="VK"
            >
              VK
            </StyledLink>
          </SocialMediaIcons>
          <Copyright>
            &copy; {new Date().getFullYear()} phantasy. All rights reserved.
          </Copyright>
        </FooterWrapper>
      </FooterContainer>
  );
};

export default Footer;