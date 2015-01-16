CREATE DATABASE kamusi;

USE kamusi;

CREATE TABLE app (app_id VARCHAR(64), app_secret VARCHAR(64));

CREATE TABLE admin (Alias VARCHAR(64), Email VARCHAR(256));

CREATE TABLE wordnet (ID INT, Word VARCHAR(64), PartOfSpeech VARCHAR(64), Definition VARCHAR(256));

CREATE TABLE users (UserID VARCHAR(64), Points INT DEFAULT 0, Rating INT DEFAULT 0, Position INT DEFAULT 1, Notify INT DEFAULT 0, Mute INT DEFAULT 0, NumReports INT DEFAULT 0, PRIMARY KEY(UserID));

CREATE TABLE rankedwords (ID INT, Word VARCHAR(64), PartOfSpeech VARCHAR(16), Rank INT, Consensus TINYINT(1) DEFAULT 0, PRIMARY KEY(ID));

CREATE TABLE definitions (DefinitionID INT auto_increment, WordID INT, Definition VARCHAR(256), UserID VARCHAR(64), Votes INT DEFAULT 0, PRIMARY KEY(DefinitionID), FOREIGN KEY (WordID) REFERENCES rankedwords (ID), FOREIGN KEY (UserID) REFERENCES users (UserID));

CREATE TABLE pos (ID INT auto_increment, Code VARCHAR(64), Full VARCHAR(64), PRIMARY KEY (ID));

CREATE TABLE languages (ID INT auto_increment, LanguageName VARCHAR(64), PRIMARY KEY(ID));

CREATE TABLE translations (ID INT auto_increment, LanguageID INT, DefinitionID INT, UserID VARCHAR(64), FOREIGN KEY (LanguageID) REFERENCES languages(ID), Word VARCHAR(64), PRIMARY KEY(ID), FOREIGN KEY (DefinitionID) REFERENCES definitions(DefinitionID), FOREIGN KEY (UserID) REFERENCES users(USERID));

CREATE INDEX RankIndex ON rankedwords(Rank);