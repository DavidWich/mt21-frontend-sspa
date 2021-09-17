import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      meta_description: {
        dashboard:
          "Have an overview of news, courses, mail stats and the library inventory of the Studi-App.",
        home: "Welcome to the Studi-App of your university.",
        news: "Here you can find the latest news for your university.",
      },
      auth: {
        email: "Email",
        password: "Password",
        login: "Login",
      },
      bib: {
        library: "Library",
      },
      cart: {
        cart_is_empty: "Cart is empty",
      },
      courses: {
        course: "Course",
        courses: "Courses",
        enrolled: "Enrolled",
        lecturer: "Lecturer",
        not_found: "not found",
        people: "People",
        send_mail: "Send mail",
      },
      dashboard: {
        bib: "Library",
        courses: "Courses",
        mails: "Emails",
        mail_count: "Number of emails",
        news: "News",
        title: "Dashboard",
      },
      header: {
        news: "News",
        bib: "Library",
        email: "Email",
        courses: "Courses",
        logout: "Logout",
        login: "Login",
      },
      mail: {
        back: "Back",
        content: "Content",
        email: "Emails",
        new_email: "New Email",
        recipient: "Recipient",
        send: "Send",
        subject: "Subject",
      },
      news: {
        all: "All",
        course_news: "Course news",
        news: "News",
        not_found: "No news found!",
      },
      welcome: { welcome: "Welcome", init: "Initialize data" },
      password: "Password",
    },
  },
  de: {
    translation: {
      meta_description: {
        dashboard:
          "Übersicht über Neuigkeiten, Kurse, Email-Statistiken und dem Bibliotheksbestand in einem Dashboard deiner Universität.",
        home: "Herzlich Willkommen zur Studi-App deiner Universität.",
        news: "Siehe die neusten Neuigkeiten zu deiner Universität.",
      },
      auth: {
        email: "Email",
        password: "Passwort",
        login: "Login",
      },
      bib: {
        library: "Bibliothek",
      },
      cart: {
        cart_is_empty: "Warenkorb ist leer",
      },
      courses: {
        course: "Kurs",
        courses: "Kurse",
        enrolled: "Eingeschrieben",
        lecturer: "Dozent",
        not_found: "nicht gefunden",
        people: "Personen",
        send_mail: "Email senden",
      },
      dashboard: {
        bib: "Bibliothek",
        courses: "Kurse",
        mails: "Emails",
        mail_count: "Anzahl Emails",
        news: "Neuigkeiten",
        title: "Dashboard",
      },
      header: {
        news: "Neuigkeiten",
        bib: "Bibliothek",
        email: "Email",
        courses: "Kurse",
        logout: "Abmelden",
        login: "Anmelden",
      },
      mail: {
        back: "Zurück",
        content: "Inhalt",
        email: "Emails",
        new_email: "Neue Email",
        recipient: "Empfänger",
        send: "Versenden",
        subject: "Betreff",
      },
      news: {
        all: "Alle",
        course_news: "Kursneuigkeiten",
        news: "Neuigkeiten",
        not_found: "Keine Neuigkeiten vorhanden!",
      },
      welcome: { welcome: "Willkommen", init: "Daten initialisieren" },
      password: "Passwort",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "de",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
