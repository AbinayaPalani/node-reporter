class Snapshot
  # Public: Initialize the Snapshot object using object.
  # Will take all the attributes / keys of the argument object and add them as
  #  private attributes in the Snapshot object
  #
  # obj - The deserialized object from JSON.
  @initFromObject = (obj) ->
    snapshot = new @

    for key, value of obj
      snapshot['_' + key] = obj[key]

    Snapshot.format_date snapshot

    snapshot

  # Public: Get the snapshot impetus (the type of notification).
  #
  # Returns the impetus String.
  impetus: ->
    ['button', 'buttonAsleep', 'notification', 'sleep', 'wake'][@_reportImpetus]

  # Public: Get the device connection during the snapshot.
  #
  # Returns the connection String.
  connection: ->
    ['cellular', 'wifi', 'none'][@_connection]

  # Public: Whether or not the snapshot date is in a interval.
  #
  # Returns a Boolean.
  between: (start, end) ->
    +@date >= +start and +@date <= +end

  # Private: Correctly formats the date of a snapshot.
  #
  # On some device, a snapshot date will look like this:
  #  '2014-08-19T11:25:19 pm+0200' which is not corrected parsed by the Date
  #  object.
  #
  # Returns nothing.
  @format_date = (snapshot) ->
    date = snapshot._date
    meridiem = /\ (a|p)m/
    snapshot.date = new Date(date.replace meridiem, '')

    if (date.match meridiem)?
      am = (date.match /\ am/)?
      if am and snapshot.date.getHours() == 12
        snapshot.date.setHours 0
      else
        snapshot.date.setHours snapshot.date.getHours() + 12

module.exports = Snapshot