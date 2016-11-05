# Be sure to restart your server when you modify this file.

Rails.application.config.session_store :redis_store, { key:          'session',
                                                       servers:      {
                                                         host: Settings.redis.host,
                                                         port: 6379,
                                                         db:   0
                                                       },
                                                       expire_after: 60.minutes }
