This repo contains the project that we built for the 2021 LevelUp Society Hackathon.

In order to run this locally you will need:

* Node/npm
* A MySQL database (either local or remote)

The first step is creating the database tables. The system does not create the tables itself.

```
CREATE TABLE `user` (
   `id` int(11) NOT NULL AUTO_INCREMENT,
   `identifier` varchar(100) NOT NULL,
   `hasOnboarded` tinyint(4) DEFAULT '0',
   `blobColor` varchar(45) DEFAULT NULL,
   `blobName` varchar(45) DEFAULT NULL,
   `extra_hearts` int(11) DEFAULT '0',
   `ok_to_pair` tinyint(4) DEFAULT '0',
   `paired_user_id` int(11) DEFAULT NULL,
   `hasOnboardedReframe` tinyint(4) DEFAULT '0',
   `hasOnboardedMap` tinyint(4) DEFAULT '0',
   PRIMARY KEY (`id`)
 ) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

CREATE TABLE `user_card` (
   `id` int(11) NOT NULL AUTO_INCREMENT,
   `user_id` int(11) NOT NULL,
   `card_text` varchar(255) NOT NULL,
   `swipes` int(11) DEFAULT '0',
   PRIMARY KEY (`id`),
   KEY `user_index` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

CREATE TABLE `user_standard_card` (
   `id` int(11) NOT NULL AUTO_INCREMENT,
   `user_id` int(11) NOT NULL,
   `card_index` int(11) NOT NULL,
   `easy` tinyint(4) DEFAULT NULL,
   `deleted` tinyint(4) DEFAULT NULL,
   `swipes` int(11) DEFAULT '0',
   PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

CREATE TABLE `user_map_unlocks` (
   `id` int(11) NOT NULL AUTO_INCREMENT,
   `user_id` int(11) NOT NULL,
   `x` int(11) NOT NULL,
   `y` int(11) NOT NULL,
   PRIMARY KEY (`id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=latin1
 ```

Once you've created these tables, make a new file, `db.json` in the `/server` folder with this content:

```
{
    "host": "localhost",
    "database": "<database>",
    "user": "<username>",
    "password": "<password>"
}
```

Once you've done that, simply run `npm install` which should run the build command, then `npm start`, which by default opens a server on port 8080.

In order to run the app, go to `http://localhost:8080/#id=<any alphanumeric value>`