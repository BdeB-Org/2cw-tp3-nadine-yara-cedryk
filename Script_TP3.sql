CREATE TABLE auteur (
    id_auteur      NUMBER(4, 0) PRIMARY KEY, 
    nom            VARCHAR2(60 BYTE), 
    biographie     VARCHAR2(4000 BYTE), 
    date_naissance DATE, 
    date_deces     DATE
);

CREATE TABLE genres (
    id_genre  NUMBER(4, 0) PRIMARY KEY, 
    nom       VARCHAR2(60 BYTE), 
    description VARCHAR2(4000 BYTE)
);

CREATE TABLE emprunteurs (
    id_emprunteur      NUMBER(4, 0) PRIMARY KEY, 
    nom                VARCHAR2(60 BYTE), 
    adresse            VARCHAR2(100 BYTE), 
    email              VARCHAR2(60 BYTE), 
    numero_telephone   VARCHAR2(20 BYTE), 
    date_inscription   DATE
);

CREATE TABLE livres (
    id_livre                  NUMBER(4, 0) PRIMARY KEY, 
    titre                     VARCHAR2(60 BYTE), 
    année_de_publication      NUMBER(4, 0), 
    nombre_copies_disponibles NUMBER(4, 0), 
    auteur_id_auteur          NUMBER(4, 0), 
    genres_id_genre           NUMBER(4, 0),
    CONSTRAINT livres_auteur_fk FOREIGN KEY (auteur_id_auteur) REFERENCES auteur (id_auteur),
    CONSTRAINT livres_genres_fk FOREIGN KEY (genres_id_genre) REFERENCES genres (id_genre)
);

CREATE TABLE prêts (
    id_pret                  NUMBER(4, 0) PRIMARY KEY, 
    date_pret                DATE, 
    date_retour              DATE, 
    emprunteurs_id_emprunteur NUMBER(4, 0), 
    id_livre                 NUMBER(4, 0),
    CONSTRAINT prêts_emprunteurs_fk FOREIGN KEY (emprunteurs_id_emprunteur) REFERENCES emprunteurs (id_emprunteur),
    CONSTRAINT prêts_livres_fk FOREIGN KEY (id_livre) REFERENCES livres (id_livre)
);

INSERT INTO auteur (id_auteur, nom, biographie, date_naissance, date_deces) VALUES
(201, 'Victor Hugo', 'Poète, romancier et dramaturge français', TO_DATE('1802-02-26', 'YYYY-MM-DD'), TO_DATE('1885-05-22', 'YYYY-MM-DD')),
(202, 'J.K. Rowling', 'Romancière et scénariste britannique', TO_DATE('1965-07-31', 'YYYY-MM-DD'), NULL),
(203, 'George Orwell', 'Essayiste et romancier britannique', TO_DATE('1903-06-25', 'YYYY-MM-DD'), TO_DATE('1950-01-21', 'YYYY-MM-DD')),
(204, 'Jane Austen', 'Romancière anglaise', TO_DATE('1775-12-16', 'YYYY-MM-DD'), TO_DATE('1817-07-18', 'YYYY-MM-DD')),
(205, 'Mark Twain', 'Écrivain et humoriste américain', TO_DATE('1835-11-30', 'YYYY-MM-DD'), TO_DATE('1910-04-21', 'YYYY-MM-DD')),
(206, 'Ernest Hemingway', 'Écrivain et journaliste américain', TO_DATE('1899-07-21', 'YYYY-MM-DD'), TO_DATE('1961-07-02', 'YYYY-MM-DD'));

INSERT INTO genres (id_genre, nom, description) VALUES
(301, 'Fiction', 'Fictional works'),
(302, 'Science Fiction', 'Science fiction works'),
(303, 'Fantasy', 'Fantasy works'),
(304, 'Classic', 'Classic literature'),
(305, 'Drama', 'Dramatic works'),
(306, 'Adventure', 'Adventure literature');

INSERT INTO emprunteurs (id_emprunteur, nom, adresse, email, numero_telephone, date_inscription) VALUES
(401, 'Jean Dupont', '123 Rue de Paris, Paris, France', 'jean.dupont@example.com', '0123456789', TO_DATE('2024-01-15', 'YYYY-MM-DD')),
(402, 'Marie Curie', '456 Avenue des Champs, Paris, France', 'marie.curie@example.com', '0987654321', TO_DATE('2024-02-20', 'YYYY-MM-DD')),
(403, 'Pierre Martin', '789 Boulevard de Lyon, Lyon, France', 'pierre.martin@example.com', '0654321098', TO_DATE('2024-03-10', 'YYYY-MM-DD')),
(404, 'Lucie Bernard', '321 Rue de Marseille, Marseille, France', 'lucie.bernard@example.com', '0789456123', TO_DATE('2024-04-05', 'YYYY-MM-DD')),
(405, 'Paul Dubois', '654 Rue de Lille, Lille, France', 'paul.dubois@example.com', '0345678901', TO_DATE('2024-05-01', 'YYYY-MM-DD')),
(406, 'Sophie Durand', '987 Avenue de Nice, Nice, France', 'sophie.durand@example.com', '0234567890', TO_DATE('2024-06-15', 'YYYY-MM-DD'));

INSERT INTO livres (id_livre, titre, année_de_publication, nombre_copies_disponibles, auteur_id_auteur, genres_id_genre) VALUES
(501, 'Les Misérables', 1862, 5, 201, 304),
(502, 'Harry Potter', 1997, 10, 202, 303),
(503, '1984', 1949, 7, 203, 302),
(504, 'Pride and Prejudice', 1813, 6, 204, 304),
(505, 'The Adventures of Tom Sawyer', 1876, 8, 205, 306),
(506, 'The Old Man and the Sea', 1952, 9, 206, 305);

INSERT INTO prêts (id_pret, date_pret, date_retour, emprunteurs_id_emprunteur, id_livre) VALUES
(601, TO_DATE('2024-05-01', 'YYYY-MM-DD'), TO_DATE('2024-05-15', 'YYYY-MM-DD'), 401, 501),
(602, TO_DATE('2024-05-10', 'YYYY-MM-DD'), TO_DATE('2024-05-24', 'YYYY-MM-DD'), 402, 502),
(603, TO_DATE('2024-05-12', 'YYYY-MM-DD'), TO_DATE('2024-05-26', 'YYYY-MM-DD'), 403, 503),
(604, TO_DATE('2024-05-14', 'YYYY-MM-DD'), TO_DATE('2024-05-28', 'YYYY-MM-DD'), 404, 504),
(605, TO_DATE('2024-05-16', 'YYYY-MM-DD'), TO_DATE('2024-05-30', 'YYYY-MM-DD'), 405, 505),
(606, TO_DATE('2024-05-18', 'YYYY-MM-DD'), TO_DATE('2024-06-01', 'YYYY-MM-DD'), 406, 506);

-- Activer le schéma pour l'accès REST
BEGIN
  ORDS.enable_schema(
    p_enabled             => TRUE,
    p_schema              => 'RESTSCOTT',
    p_url_mapping_type    => 'BASE_PATH',
    p_url_mapping_pattern => 'bibliotheque',
    p_auto_rest_auth      => FALSE
  );
  COMMIT;
END;
/

-- Activer l'accès REST pour les tables
BEGIN
  ORDS.enable_object (
    p_enabled      => TRUE,
    p_schema       => 'RESTSCOTT',
    p_object       => 'AUTEUR',
    p_object_type  => 'TABLE',
    p_object_alias => 'auteur'
  );
  ORDS.enable_object (
    p_enabled      => TRUE,
    p_schema       => 'RESTSCOTT',
    p_object       => 'GENRES',
    p_object_type  => 'TABLE',
    p_object_alias => 'genres'
  );
  ORDS.enable_object (
    p_enabled      => TRUE,
    p_schema       => 'RESTSCOTT',
    p_object       => 'LIVRES',
    p_object_type  => 'TABLE',
    p_object_alias => 'livres'
  );
  ORDS.enable_object (
    p_enabled      => TRUE,
    p_schema       => 'RESTSCOTT',
    p_object       => 'EMPRUNTEURS',
    p_object_type  => 'TABLE',
    p_object_alias => 'emprunteurs'
  );
  ORDS.enable_object (
    p_enabled      => TRUE,
    p_schema       => 'RESTSCOTT',
    p_object       => 'PRÊTS',
    p_object_type  => 'TABLE',
    p_object_alias => 'prêts'
  );
 
  COMMIT;
END;
/

-- Confirmation de l'activation du schéma
SELECT *
FROM user_ords_schemas;

-- Confirmation de l'activation des tables pour l'accès REST
SELECT *
FROM user_ords_enabled_objects;


