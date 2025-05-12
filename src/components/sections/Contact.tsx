import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from 'react-i18next';
import {ContactType, UserData, FormErrors, FormMessage} from "../../types";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-size: 52px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  margin-bottom: 40px;
  color: ${({ theme }) => theme.text_secondary};

  @media (max-width: 768px) {
    font-size: 16px;
  }
  @media (max-width: 405px) {
    font-size: 15px;
  }
`;

const ContactForm = styled.div`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: rgba(17, 25, 40, 0.83);
  border: 1px solid rgba(255, 255, 255, 0.125);
  padding: 32px;
  border-radius: 12px;
  box-shadow: rgba(23, 92, 230, 0.1) 0 4px 24px;
  margin-top: 28px;
  gap: 12px;
`;

const ContactTitle = styled.div`
  font-size: 28px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  outline: none;
  resize: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactButton = styled.input`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: hsla(271, 100%, 50%, 1);
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
  &:hover {
    cursor: pointer;
  }
`;

const ErrorText = styled.div`
  color: #ff4d4f;
  font-size: 14px;
  margin-top: -8px;
  margin-bottom: 8px;
`;

const FormDataSuccessText = styled.div`
  color: #10ff00;
  text-align: center;
`;

const FormDataErrorText = styled.div`
  color: #ff0000;
  text-align: center;
`;

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const contact = t('contact', { returnObjects: true }) as ContactType;

  const [userData, setUserData] = useState<UserData>({
    email: '',
    name: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState<FormMessage>({
    "status": "",
    "message": ""
  });

  useEffect(() => {
    if (formMessage.status.length > 0) {
      setTimeout(() => {
        setFormMessage({
          "status": "",
          "message": ""
        });
      }, 5000)
    }
  }, [formMessage.status])

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!userData.email.trim()) {
      newErrors.email = contact.errors?.emailRequired || contact.emailRequired;
    } else if (!emailRegex.test(userData.email)) {
      newErrors.email = contact.errors?.emailInvalid || contact.invalidEmail;
    }

    if (!userData.name.trim()) {
      newErrors.name = contact.errors?.nameRequired || contact.nameRequired;
    }

    if (!userData.message.trim()) {
      newErrors.message = contact.errors?.messageRequired || contact.messageRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    const params = new URLSearchParams();
    params.append('email', userData.email);
    params.append('name', userData.name);
    params.append('message', userData.message);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData.message)
        throw new Error(contact.unknownError);
      }

      setUserData({
        email: '',
        name: '',
        message: ''
      });

      setFormMessage({
        "status": "success",
        "message": contact.successSendMessage
      });

    } catch (error) {
      setFormMessage({
        "status": "error",
        "message": contact.failedSendMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFormMessage = () => {
    if (formMessage.status === "success") {
      return <FormDataSuccessText>{formMessage.message}</FormDataSuccessText>;
    } else if (formMessage.status === "error") {
      return <FormDataErrorText>{formMessage.message}</FormDataErrorText>;
    }

    return null;
  };

  return (
      <Container id="Contact">
        <Wrapper>
          <Title>{contact.title}</Title>
          <Desc>{contact.desc}</Desc>
          <ContactForm as="form" onSubmit={handleSubmit}>
            <ContactTitle>{contact.titleForm} 🚀</ContactTitle>

            <ContactInput
                placeholder={contact.email}
                name="email"
                type="email"
                value={userData.email}
                onChange={handleChange}
                required
                style={{ borderColor: errors.email ? '#ff4d4f' : '' }}
            />
            {errors.email && <ErrorText>{errors.email}</ErrorText>}

            <ContactInput
                placeholder={contact.name}
                name="name"
                value={userData.name}
                onChange={handleChange}
                required
                style={{ borderColor: errors.name ? '#ff4d4f' : '' }}
            />
            {errors.name && <ErrorText>{errors.name}</ErrorText>}

            <ContactInputMessage
                placeholder={contact.message}
                name="message"
                rows={4}
                value={userData.message}
                onChange={handleChange}
                required
                style={{ borderColor: errors.message ? '#ff4d4f' : '' }}
            />
            {errors.message && <ErrorText>{errors.message}</ErrorText>}

            {renderFormMessage()}

            <ContactButton
                type="submit"
                value={isSubmitting ? contact.sendingMessage : contact.send}
                disabled={isSubmitting}
            />
          </ContactForm>
        </Wrapper>
      </Container>
  );
};

export default Contact;