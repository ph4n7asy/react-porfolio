import React, { useState } from "react";
import { Link as LinkR } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import { MenuRounded } from "@mui/icons-material";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from 'react-i18next';
import {MenuItems, MobileMenuProps, BioType} from "../types";


const Nav = styled.div`
  background-color: ${({ theme }) => theme.bg};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  color: white;
`;

const NavbarContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
`;

const NavLogo = styled(LinkR)`
  font-weight: 500;
  font-size: 14px;
  text-decoration: none;
  color: inherit;
  white-space: nowrap;
  @media screen and (max-width: 830px) {
    font-size: 11px;
  }
`;

const NavItems = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 0 6px;
  list-style: none;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const ButtonContainer = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0 6px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const GithubButton = styled.a`
  border: 1px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  justify-content: center;
  display: flex;
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.6s ease-in-out;
  text-decoration: none;
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text_primary};
  }
  @media screen and (max-width: 854px) {
    font-size: 11px;
  }
`;

const MobileIcon = styled.div`
  height: 100%;
  align-items: center;
  color: ${({ theme }) => theme.text_primary};
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.ul<MobileMenuProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 16px;
  list-style: none;
  padding: 12px 40px 24px 40px;
  background: ${({ theme }) => theme.card_light};
  position: absolute;
  top: 80px;
  right: 0;

  transition: all 0.6s ease-in-out;
  transform: ${({ isOpen }) =>
    isOpen ? "translateY(0)" : "translateY(-100%)"};
  border-radius: 0 0 20px 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
  z-index: ${({ isOpen }) => (isOpen ? "1000" : "-1000")};
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 38px;
  width: auto;
`;

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const theme = useTheme();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const { t } = useTranslation();
  const menuItems = t('menuItems', { returnObjects: true }) as MenuItems;
  const bio = t('bio', { returnObjects: true }) as BioType;

  return (
      <Nav>
        <NavbarContainer>
          <LogoContainer>
            <NavLogo to="/">Frontend Artist {"->"} Backend Scientist</NavLogo>
            <LanguageSwitcher />
          </LogoContainer>

          <MobileIcon onClick={toggleMenu}>
            <MenuRounded style={{ color: "inherit" }} />
          </MobileIcon>

          <NavItems>
            <NavLink href="#About">{menuItems.about}</NavLink>
            <NavLink href="#Skills">{menuItems.skills}</NavLink>
            <NavLink href="#Experience">{menuItems.experience}</NavLink>
            <NavLink href="#Projects">{menuItems.projects}</NavLink>
          </NavItems>

          {isOpen && (
              <MobileMenu isOpen={isOpen}>
                <NavLink onClick={closeMenu} href="#About">
                  {menuItems.about}
                </NavLink>
                <NavLink onClick={closeMenu} href="#Skills">
                  {menuItems.skills}
                </NavLink>
                <NavLink onClick={closeMenu} href="#Experience">
                  {menuItems.experience}
                </NavLink>
                <NavLink onClick={closeMenu} href="#Projects">
                  {menuItems.projects}
                </NavLink>
                <GithubButton
                    href={bio.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: theme.primary,
                      color: theme.text_primary,
                    }}
                >
                  {menuItems.githubProfile}
                </GithubButton>
              </MobileMenu>
          )}

          <ButtonContainer>
            <GithubButton
                href={bio.github}
                target="_blank"
                rel="noopener noreferrer"
            >
              {menuItems.githubProfile}
            </GithubButton>
          </ButtonContainer>
        </NavbarContainer>
      </Nav>
  );
};

export default Navbar;