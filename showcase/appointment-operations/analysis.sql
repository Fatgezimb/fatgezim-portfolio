-- One row per appointment date, waiting-time band and recorded SMS indicator.
-- Input is validated by pipeline.py; all measures are additive counts.
SELECT appointment_date, weekday, lead_band, sms_received,
       COUNT(*) AS appointments,
       SUM(no_show) AS missed,
       SUM(lead_days) AS total_lead_days
FROM appointments
GROUP BY appointment_date, weekday, lead_band, sms_received
ORDER BY appointment_date, lead_band, sms_received;
