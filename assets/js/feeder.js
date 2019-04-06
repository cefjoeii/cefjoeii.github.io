// Feeder

// Load my github activity and display on the index page
function loadGithubActivity(callback) {
  getData('https://api.github.com/users/cefjoeii/events/public', function (result) {
    var text = '';

    for (res of result) {
      var icon = '';
      var event = '';
      var linkUrl = '';
      var linkText = '';

      switch (res.type) {
        case 'CreateEvent':
          var refType = res.payload.ref_type

          switch(refType) {
            case 'repository':
              icon = '💡';
              event = 'created a ' + refType;
              break;
            case 'branch':
              icon = '🌱';
              event = 'created a ' + refType;
              break;
            case 'tag':
              icon = '🏷';
              event = 'created a release on';
              break;
            default:
              icon = '💎';
              event = 'created a ' + refType;
              break;
          }

          linkUrl = 'https://github.com/' + res.repo.name;
          linkText = res.repo.name;
          break;

        case 'WatchEvent':
          icon = '👍🏼';
          event = 'liked';
          linkUrl = 'https://github.com/' + res.repo.name;
          linkText = res.repo.name;
          break;

        case 'PushEvent':
          icon = '⬆️';

          var commitCount = res.payload.commits.length;

          if (commitCount !== 1) {
            event = 'pushed ' + commitCount + ' commits to';
          } else {
            event = 'pushed a commit to';
          }

          linkUrl = 'https://github.com/' + res.repo.name;
          linkText = res.repo.name;
          break;

        case 'ForkEvent':
          icon = '🧬';
          event = 'forked a repository';
          linkUrl = 'https://github.com/' + res.repo.name;
          linkText = res.repo.name;
          break;

        case 'PullRequestEvent':
          icon = '📦'
          event = res.payload.action + ' a pull request on';
          linkUrl = 'https://github.com/' + res.repo.name;
          linkText = res.repo.name;
          break;

        case 'IssuesEvent':
          icon = '🔥';
          event = res.payload.action + ' an issue';
          linkUrl = res.payload.issue.html_url
          linkText = res.repo.name + '/issues/' + res.payload.issue.number
          break;

        case 'IssueCommentEvent':
          icon = '💬';
          event = (res.payload.action === 'created') ? 'commented on' : res.payload.action + ' a comment on';
          linkUrl = res.payload.comment.html_url;
          linkText = res.repo.name + '/issues/' + res.payload.issue.number
          break;

        case 'GollumEvent':
          var page = res.payload.pages[0];

          switch(page.action) {
            case 'created':
              icon = '📄';
              break;
            case 'edited':
              icon = '📝';
              break;
            default:
              icon = '📃';
              break;
          }
          
          event = page.action + ' a wiki page';
          linkUrl = page.html_url;
          linkText = res.repo.name + '/wiki/' + page.page_name;
          break;

        default:
          icon = '😱';
          event = 'did something on';
          linkUrl = 'https://github.com/' + res.repo.name;
          linkText = res.repo.name;
          break;
      }

      text += '<p>' + icon + ' ' + event + ' '
        + '<a href="' + linkUrl + '" target="_blank" class="custom-link">' + linkText + '</a> '
        + '<span>' + moment(res.created_at).fromNow() + '</span></p>'
    }
    callback(text);
  });
}

// Load a random quote and display on the index page
function loadQuotes(callback) {
  getData('{{ base }}/../assets/json/quotes.json', function (result) {
    const randomNum = Math.floor((Math.random() * Object.keys(result.quotes).length));
    callback("“" + result.quotes[randomNum].text + "”", result.quotes[randomNum].author);
  });
}

// Detect the visitor's location
function loadCountry(callback) {
  getData('https://freegeoip.app/json/', function (result) {
    var country = result.country_name
    const flag = result.country_code.toUpperCase().replace(/./g, char => String.fromCodePoint(char.charCodeAt(0) + 127397));

    switch (country) {
      case 'Bahamas':
      case 'Cayman Islands':
      case 'Central African Republic':
      case 'Channel Islands':
      case 'Comoros':
      case 'Czech Republic':
      case 'Dominican Republic':
      case 'Falkland Islands':
      case 'Gambia':
      case 'Isle of Man':
      case 'Ivory Coast':
      case 'Leeward Islands':
      case 'Maldives':
      case 'Marshall Islands':
      case 'Netherlands':
      case 'Netherlands Antilles':
      case 'Philippines':
      case 'Solomon Islands':
      case 'Turks and Caicos Islands':
      case 'Virgin Islands':
        country = 'the ' + flag + ' ' + country;
        break;
      default:
        country = flag + ' ' + country;
        break;
    }
    callback('Hi there, visitor from ' + country + '.');
  });
}

// Load random quote based on the weekday
function loadWeekdayQuotes(callback) {
  getData('{{ base }}/../assets/json/weekdays.json', function (result) {
    var weekday = moment().format('dddd');
    var randomNum = Math.floor((Math.random() * Object.keys(result[weekday.toLowerCase()]).length));
    var quote = result[weekday.toLowerCase()][randomNum]
    callback('It’s ' + weekday + '. ' + quote);
  });
}
