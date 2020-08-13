const {buildSchema} = require('graphql')

module.exports = buildSchema(`

  type LaunchSiteType{
    site_name_long: String
  }

  type rocketType{
    rocket_name:String!
  }

  type linksType {
    flickr_images : [String]
  }

  type LaunchType {
    mission_name: String!
    launch_site: LaunchSiteType
    rocket:rocketType
    links:linksType
    launch_date_utc:String!
  }

  type Query {
    launches(year:String!) : [LaunchType!]
  }
`)