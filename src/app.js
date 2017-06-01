import styles from './style/app.css'

(function(global) {
  global.datePicker = function(options) {
    var deepExtend = function(out) {
      out = out || {}
      for(var i = 1; i < arguments.length; i++) {
        var obj = arguments[i]
        if(!obj) continue
        for(var key in obj) {
          if(obj.hasOwnProperty(key)) {
            if(typeof obj[key] === 'object') {
              out[key] = deepExtend(out[key], obj[key])
            } else {
              out[key] = obj[key]
            }
          }
        }
      }
      return out
    }

    /*
     * Default settings
     */
    var settings = deepExtend({
      week: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      close: 'close',
      format: 'yy-mm-dd',
      idPrefix: 'datePicker-',
      mouseover: false,
      numberOfMonths: 2,
      DayText: false,
      gholiday: false
    }, options)

    /*
     * For mm/dd
     */
    const zeroPadding = num => {
      return ('0' + num).slice(-2)
    }

    function Holiday(yy, mm) {
      let holidayArray = []
      const xhr = new XMLHttpRequest()
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            // console.log(JSON.parse(this.responseText))
            holidayArray.push(JSON.parse(this.responseText))
          } else {
            // console.log('Failed')
          }
        }
      }
      xhr.onload = function() {
        // console.log(holidayArray)
      }
      xhr.open('GET', 'getholiday.php', true)
      xhr.send(null)
      return holidayArray
    }

    function fillDates(flag, i, w, daySearch, flagHoliday, currentYMD) {
      // 指定曜日を非活性にする
      if(settings.disabledDays) {
        const week = settings.disabledDays.split(',')
        for(let p = 0; p < week.length; p++) {
          if(Number(week[p]) === w) {
            flag = false
          }
        }
      }

      // 非活性日 flag
      if(daySearch) {
        flag = false
      }

      // 土日 class
      var holidayClass = ''
      if(w === 0) {
        holidayClass = ' is-national-holiday'
      } else if(w === 6) {
        holidayClass = ' is-saturday'
      }

      // 祭日 class 未実装
      if(flagHoliday) {
        holidayClass  = ' national-holiday'
      }

      if(flag) { // 有効日
        return '<td class="datePickerUI__date datePickerUI__date--state_enabled' + holidayClass + '" data-ymd="' + currentYMD + '" data-holiday-title="' + flagHoliday + '">' + i + '</td>'
      } else { // 無効日
        return '<td class="datePickerUI__date' + holidayClass + '" data-holiday-title="' + flagHoliday + '">' + i + '</td>'
      }
    }

    /*
     * Calendar elements
     */
    function generateCalendar(yy, mm, top, left, id) {
      if(settings.gholiday) {
        console.log(Holiday(yy, mm))
      }

      var week = settings.week
      var close = settings.close
      var calendarEl = '<div class="datePickerUI">'

      var minDate = null
      var maxDate = null

      if(settings.minDate) {
        if(settings.minDate === 'today') {
          var now = new Date()
          var year = now.getFullYear()
          var month = now.getMonth() +1
          var date = now.getDate()

          minDate = new Date(year, month -1, date)
          // console.log('minDate',minDate)
        } else {
          // const aha = new Date(settings.minDate.getTime())
          const aha = new Date(settings.minDate)
          console.log(aha)
          // var aha = new Date((new Date().getTime() + 11 * 60 * 60 * 1000))
          // var minDateArr = settings.minDate.split('-')
          // minDate = new Date(minDateArr[0], minDateArr[1] -1, minDateArr[2])
          minDate = aha

          console.log('minDate',minDate)
        }
      }

      if(settings.maxDate) {
        var maxDateArr = settings.maxDate.split('-')
        maxDate = new Date(maxDateArr[0], maxDateArr[1] -1, maxDateArr[2])
      }

      for(var n = 0; n < settings.numberOfMonths; n++) {
        var currentDate = new Date(yy, (mm -1) +n, 1)
        var currentYear  = currentDate.getFullYear()
        var currentMonth  = currentDate.getMonth() +1

        var numBlankDays = currentDate.getDay()|0
        var lastDayOfCurrentMonth = new Date(yy, currentMonth, 0).getDate()|0

        var numWeeks = 1
        var firstDay = numBlankDays

        var UIID = settings.idPrefix + '' + currentYear + '' + currentMonth

        calendarEl += '<div class="datePickerUI__wrap" id="' + UIID + '" data-year="' + currentYear + '" data-month="' + currentMonth +'">'
        calendarEl += '  <div class="datePickerUI__head">'
        calendarEl += '    <div class="datePickerUI__this-month">' + currentYear + ' - ' + currentMonth + '</div>'
        calendarEl += '  </div>' // [/.datePickerUI__head]

        calendarEl += '  <div class="datePickerUI__days">'

        for(var i = 0; i < week.length; i++) { // Days a week
          calendarEl += '  <div class="datePickerUI__day">' + week[i] + '</div>'
        }

        calendarEl += '  </div>' // [/.datePickerUI__days]

        calendarEl += '  <table class="datePickerUI__dates">'
        calendarEl += '    <tr class="week1">'

        for(var i = 0; i < numBlankDays; i++) { // Dates of last month
          calendarEl += '    <td class="datePickerUI__date"></td>'
        }

        for(var i = 1; i <= lastDayOfCurrentMonth; i++) { // Current month's dates
          if(firstDay !== 0 && (numBlankDays +i) % 7 === 1) { // Set weeks
            numWeeks++
            firstDay = 0
            calendarEl += '</tr>'
            calendarEl += '<tr class="week' + numWeeks + '">'
          }
          firstDay++
          // calendarEl += '    <td class="datePickerUI__date datePickerUI__date--state_enabled">' + i + '</td>'

          var currentDateAll = new Date(yy, currentMonth -1, i)
          var numToWeeks = currentDateAll.getDay()
          var daySearch = false
          var flagHoliday = ''
          var currentDates  = currentDateAll.getDate()
          var currentYMD = ('' + currentYear) + ('' + zeroPadding(currentMonth)) + ('' + zeroPadding(currentDates))

          // 選択不可日
          if(settings.disabledDates) {
            var disabledDates = settings.disabledDates
            Object.keys(disabledDates).map(function(key) {
              return disabledDates[key]
            })
            disabledDates = Object.values(disabledDates)
            var search = disabledDates.indexOf(currentYMD)
            if(search !== -1) {
              daySearch = true
            }
          }

          // 開始日と終了日がどちらも有効
          if( minDate !== null && maxDate !== null ) {
            if( currentDateAll.getTime() >= minDate.getTime() && currentDateAll.getTime() <= maxDate.getTime() ) {
              calendarEl += fillDates(true, i, numToWeeks, daySearch, flagHoliday, currentYMD)
            } else {
              calendarEl += fillDates(false, i, numToWeeks, daySearch, flagHoliday, currentYMD)
            }
          } else if( minDate !== null && maxDate === null ) { // 開始日だけ有効
            if(currentDateAll.getTime() >= minDate.getTime()) {
              calendarEl += fillDates(true, i, numToWeeks, daySearch, flagHoliday, currentYMD)
            } else {
              calendarEl += fillDates(false, i, numToWeeks, daySearch, flagHoliday, currentYMD)
            }
          } else if(minDate === null && maxDate !== null) { // 終了日だけ有効
            if(currentDateAll.getTime() <= maxDate.getTime()) {
              calendarEl += fillDates(true, i, numToWeeks, daySearch, flagHoliday, currentYMD)
            } else {
              calendarEl += fillDates(false, i, numToWeeks, daySearch, flagHoliday, currentYMD)
            }
          } else { // 無指定
            calendarEl += fillDates(true, i, numToWeeks, daySearch, flagHoliday, currentYMD)
          }
        }

        calendarEl += '    </tr>'
        calendarEl += '  </table>'

        calendarEl += '</div>'
      }
      calendarEl += '  <div class="datePickerUI__control">'
      calendarEl += '    <div class="datePickerUI__prev">&lt;</div>'
      calendarEl += '    <div class="datePickerUI__next">&gt;</div>'
      calendarEl += '  </div>' // [/.datePickerUI__control]
      calendarEl += '  <div class="datePickerUI__close">' + close + '</div>'
      calendarEl += '</div>'

      document.body.insertAdjacentHTML('beforeend', calendarEl)

      Array.prototype.forEach.call(document.getElementsByClassName('datePickerUI'), function(node, i) {
        node.style.top = top + 'px'
        node.style.left = (left + node.offsetWidth * i) + 'px'
        node.dataset.top = top
        node.dataset.left = left
        node.dataset.col = settings.numberOfMonths
        if(id) node.dataset.fid = id
      })
    }

    function removeCalendar() {
      Array.prototype.forEach.call(document.getElementsByClassName('datePickerUI'), function(node) {
        node.parentNode.removeChild(node)
      })
    }

    /*
     * Open calendar
     */
    document.addEventListener('click', function(event) {
      const targetClassName = event.target.className

      if((' ' + targetClassName + ' ').replace(/[\n\t]/g, ' ').indexOf(' datePicker ') !== -1) {
        removeCalendar()
        var date = new Date()
        var yy = date.getFullYear()
        var mm = date.getMonth() +1

        var top = Math.ceil(event.target.offsetTop) +20
        var left = Math.ceil(event.target.offsetLeft)
        var id = event.target.id

        generateCalendar(yy, mm, top, left, id)
      }

      if(targetClassName.indexOf('datePicker') < 0) removeCalendar()
    }, false)

    /*
     * If the mouseover option is true, mouseover a date and set to <input>
     */
    document.addEventListener('mouseover', function(event) {
      if(event.target.classList.contains('datePickerUI__date--state_enabled')) {
        if(settings.mouseover) {
          var datePicker = event.target.parentNode.parentNode.parentNode.parentNode

          var year = datePicker.dataset.year|0
          var month = datePicker.dataset.month|0
          var day = event.target.innerHTML|0
          var format = settings.format

          day = zeroPadding(day)
          month = zeroPadding(month)

          format = format.replace('yy', year)
          format = format.replace('mm', month)
          format = format.replace('dd', day)

          var fid = datePicker.parentNode.dataset.fid
          document.getElementById(fid).value = format
        }
      }
    }, false)

    /*
     * On click the date to set to <input> and close the calendar
     */
    document.addEventListener('click', function(event) {
      if(event.target.classList.contains('datePickerUI__date--state_enabled')) {
        var datePicker = event.target.parentNode.parentNode.parentNode.parentNode

        var year = datePicker.dataset.year|0
        var month = datePicker.dataset.month|0
        var day = event.target.innerHTML|0
        var format = settings.format

        day = zeroPadding(day)
        month = zeroPadding(month)

        format = format.replace('yy', year)
        format = format.replace('mm', month)
        format = format.replace('dd', day)

        var fid  = datePicker.parentNode.dataset.fid
        document.getElementById(fid).value = format
        removeCalendar()
      }
    }, false)

    /*
     * To the next month
     */
    document.addEventListener('click', function(event) {
      if(event.target.classList.contains('datePickerUI__next')) {
        var datePickerUI = document.querySelector('.datePickerUI')
        var datePickerUIWrap = document.querySelector('.datePickerUI__wrap')


        var year  = datePickerUIWrap.dataset.year|0
        var month = datePickerUIWrap.dataset.month|0
        var top   = datePickerUI.dataset.top|0
        var left  = datePickerUI.dataset.left|0
        var id = datePickerUI.dataset.fid

        if(month === 12) {
          year = year +1
          month = 1
        } else {
          month = month +1
        }
        removeCalendar()
        generateCalendar(year, month, top, left, id)
      }
    })

    /*
     * To the previous month
     */
    document.addEventListener('click', function(event) {
      if(event.target.classList.contains('datePickerUI__prev')) {
        var datePickerUI = document.querySelector('.datePickerUI')
        var datePickerUIWrap = document.querySelector('.datePickerUI__wrap')

        var year  = datePickerUIWrap.dataset.year|0
        var month = datePickerUIWrap.dataset.month|0
        var top   = datePickerUI.dataset.top|0
        var left  = datePickerUI.dataset.left|0
        var id = datePickerUI.dataset.fid

        if(month === 1) {
          year = year -1
          month = 12
        } else {
          month = month -1
        }
        removeCalendar()
        generateCalendar(year, month, top, left, id)
      }
    })

    /*
     * Close the calendar
     */
    document.addEventListener('click', function(event) {
      if(event.target.classList.contains('datePickerUI__close')) {
        removeCalendar()
      }
    }, false)
  }
})(typeof global !== 'undefined' ? global : window)
