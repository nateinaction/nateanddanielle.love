// http://www.hawking.org.uk/the-beginning-of-time.html

const defaultTimeline = {
  latest: {
    fetching: false
  },
  earliest: {
    fetching: false
  },
  latestLoaded: {
    fetching: false
  },
  earliestLoaded: {
    fetching: false
  }
}

const timeline = (state = defaultTimeline, action) => {
	switch (action.type) {
		case 'FETCHING_TIMELINE':
      return Object.assign(state, {
        latest: {
          fetching: true
        },
        earliest: {
          fetching: true
        }
      })
    case 'FETCHING_POSTS':
      return Object.assign(state, {
        latestLoaded: Object.assign(state.latestLoaded, {
          fetching: true
        }),
        earliestLoaded: Object.assign(state.latestLoaded, {
          fetching: true
        })
      })
    case 'SET_POSTS':
      return Object.assign(state, {
        latestLoaded: {
          fetching: false,
          date: action.date.latestLoaded
        },
        earliestLoaded: {
          fetching: false,
          date: action.date.earliestLoaded
        }
      })
    case 'SET_TIMELINE':
		case 'UPDATE_TIMELINE':
      return Object.assign(state, action.timeline)
		default:
			return state
	}
}

export default timeline
