<?php
$calendar_id = urlencode('japanese__ja@holiday.calendar.google.com');
$url = 'https://calendar.google.com/calendar/ical/'.$calendar_id.'/public/full.ics';
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
$result = curl_exec($ch);
curl_close($ch);
if (!empty($result)) {
  $items = $sort = array();
  $start = false;
  $count = 0;
  foreach(explode("\n", $result) as $row => $line) {
    if (0 === $row && false === stristr($line, 'BEGIN:VCALENDAR')) {
      break;
    }

    $line = trim($line);

    if (false !== stristr($line, 'BEGIN:VEVENT')) {
      $start = true;
    } elseif ($start) {
      if (false !== stristr($line, 'END:VEVENT')) {
        $start = false;
        ++$count;
      } else {
        if (empty($items[$count])) {
          $items[$count] = array('date' => null, 'title' => null);
        }
        if(0 === strpos($line, 'DTSTART;VALUE')) {
          $date = explode(':', $line);
          $date = end($date);
          $items[$count]['date'] = $date;
          $sort[$count] = $date;
        }
        elseif(0 === strpos($line, 'SUMMARY:')) {
          list($title) = explode('/', substr($line, 8));
          $items[$count]['title'] = trim($title);
        }
      }
    }
  }
  // 日付でソート
  $items = array_combine($sort, $items);
  ksort($items);
  // echo $items;
  // print_r($items);
  echo json_encode($items);
}
?>
