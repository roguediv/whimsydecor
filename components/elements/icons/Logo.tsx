'use client'
type Props = {
  className?: string;
};

const Logo: React.FC<Props> = ({ className = ''}) => {
  return (
    <div className={`Logo ${className}`}>
      <svg width="119" height="80" viewBox="0 0 119 80" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_d_110_150)"><path fillRule="evenodd" clipRule="evenodd" d="M63.1713 10.7598L67.1689 12.7004C68.321 13.2597 69.0525 14.4279 69.0525 15.7086V15.9293C69.0525 16.7367 68.7098 17.5063 68.1096 18.0464C67.5094 18.5866 67.1666 19.3561 67.1666 20.1636V20.8268C67.2714 20.9353 67.3736 21.046 67.4734 21.1589C67.8703 20.9223 68.2302 20.6885 68.5361 20.4744C69.111 20.072 69.6508 19.617 70.1769 19.1736L70.1769 19.1735C70.7646 18.6783 71.3351 18.1974 71.9183 17.8202C72.3223 17.559 72.7505 17.3266 73.1791 17.0941L73.1792 17.094C73.9405 16.681 74.703 16.2672 75.3328 15.6899C75.8272 15.2366 76.2446 14.706 76.5687 14.1187L78.4554 10.699C78.8788 9.93154 79.4489 9.25484 80.1333 8.70732C80.6918 8.26055 81.3466 7.94994 82.0459 7.80009L82.6101 7.67918C83.2764 7.53642 83.9012 7.24338 84.4369 6.82242L85.7176 5.81621C86.0594 5.54762 86.5106 5.46213 86.927 5.58706L87.0482 5.62343C87.6641 5.80818 88.0259 6.44434 87.87 7.06809C87.8061 7.32375 87.66 7.55136 87.4543 7.71599L86.6262 8.37844C86.1382 8.7688 85.5719 9.04931 84.9656 9.20087L84.342 9.35679C83.8639 9.47631 83.4003 9.6478 82.9595 9.86818C81.4455 10.6252 80.271 11.9231 79.6684 13.5049L79.0967 15.0055L77.5881 17.8342L76.6621 19.146C75.7935 20.3764 74.5544 21.297 73.1256 21.7733C72.3352 22.0368 71.5976 22.438 70.947 22.9585L69.9312 23.7712C69.734 23.9288 69.5412 24.0917 69.3528 24.2594C69.3671 24.2971 69.3812 24.3348 69.395 24.3727L94.7814 15.2094C97.8213 14.1121 101.029 13.551 104.261 13.551H108.064C109.774 13.551 111.462 13.938 113.001 14.6829C114.478 15.3979 115.032 17.2205 114.202 18.6366L110.068 25.6943C109.23 27.1252 107.977 28.2672 106.474 28.9685C105.392 29.4736 104.212 29.7353 103.018 29.7353H99.7062C99.5392 29.7353 99.4173 29.8933 99.4597 30.0548L99.6641 30.8339C99.9596 31.9604 99.7637 33.1593 99.125 34.1332C98.5605 34.994 97.6936 35.6118 96.6957 35.8645L89.8309 37.6032C88.4371 37.9562 87.0049 38.1348 85.5672 38.1348C83.638 38.1348 81.7224 37.8133 79.8989 37.1837L74.9408 35.4715L68.8034 33.5657C68.6155 33.5073 68.4345 33.436 68.2614 33.3528C68.0897 33.6044 67.9067 33.8482 67.7132 34.0836C70.255 35.9485 73.68 38.2833 74.6539 38.2847C76.1743 38.287 79.3075 39.0636 80.1483 39.9303C80.7757 40.5771 80.6909 42.06 80.5492 42.8574C80.5319 42.9547 80.5732 43.0536 80.6567 43.1065C82.3978 44.212 83.3438 46.2236 83.085 48.2697L82.9193 49.5792C82.9037 49.7025 82.962 49.8235 83.0683 49.8881L90.5673 54.4451C90.946 54.6752 91.154 55.1065 91.0983 55.5461C91.0104 56.2414 90.3142 56.6872 89.6458 56.4763L86.923 55.617C86.9132 55.6139 86.9041 55.6088 86.8963 55.6021L83.8245 52.9411L81.442 50.7388L80.4141 49.8484C79.3513 48.7528 78.8441 47.2334 79.0357 45.719L79.1053 45.1694C79.1091 45.1387 79.1007 45.1078 79.0817 45.0834L78.6742 44.5578C78.5313 44.3735 78.3525 44.2201 78.1485 44.107L76.6814 43.2934C75.0257 42.5852 73.5778 41.4668 72.4743 40.0437L72.2995 39.8181C72.2307 39.7295 72.1501 39.6506 72.06 39.5837L70.759 38.6186C70.2952 38.2745 69.816 37.9522 69.3229 37.6526C71.4027 40.1935 72.7483 43.5219 72.9755 47.201L76.6995 50.543C77.0041 50.8164 77.2731 51.127 77.5001 51.4676L77.6024 51.6211C78.2965 52.6622 78.6668 53.8854 78.6668 55.1366V55.4807V56.2634C78.6668 56.3622 78.7208 56.453 78.8075 56.5003L81.3257 57.8739C82.2442 58.3749 82.8157 59.3376 82.8157 60.3838V61.614C82.8157 61.7872 82.9051 61.9481 83.0522 62.0395L89.1638 65.8386C89.5552 66.0819 89.7932 66.5101 89.7932 66.971C89.7932 67.7073 89.1963 68.3043 88.4599 68.3043H88.1814C87.7637 68.3043 87.3623 68.1421 87.0618 67.852L82.16 63.1193C82.0956 63.057 82.0146 63.0146 81.9268 62.9971L80.5532 62.7224C80.3025 62.6722 80.0596 62.5889 79.831 62.4745C79.091 62.1046 78.5462 61.4339 78.3356 60.6338L77.7496 58.407C77.733 58.344 77.6949 58.2887 77.6418 58.2507L77.4174 58.0905C76.7437 57.6093 76.1245 57.0561 75.5707 56.4407L75.21 56.04C74.8755 55.6683 74.584 55.26 74.3412 54.8229C73.9592 54.1354 73.7025 53.3855 73.5829 52.6082L73.4048 51.4504C73.3932 51.3751 73.3497 51.3084 73.2854 51.2675L72.8364 50.9818C71.8225 59.2103 66.4768 69.8269 59.9287 70.5294L59.174 71.5098L58.4054 70.5112C51.9565 69.666 46.7043 59.2422 45.6641 51.0938L45.3911 51.2675C45.3269 51.3084 45.2833 51.3751 45.2718 51.4504L45.0936 52.6082C44.974 53.3855 44.7173 54.1354 44.3353 54.8229C44.0925 55.26 43.801 55.6683 43.4665 56.04L43.1059 56.4407C42.5521 57.0561 41.9328 57.6093 41.2591 58.0905L41.0347 58.2507C40.9817 58.2887 40.9435 58.344 40.9269 58.407L40.3409 60.6338C40.1304 61.4339 39.5855 62.1046 38.8456 62.4745C38.6169 62.5889 38.374 62.6722 38.1233 62.7224L36.7498 62.9971C36.6619 63.0146 36.5809 63.057 36.5165 63.1193L31.6148 67.852C31.3143 68.1421 30.9129 68.3043 30.4952 68.3043H30.2166C29.4803 68.3043 28.8833 67.7073 28.8833 66.971C28.8833 66.5101 29.1213 66.0819 29.5128 65.8386L35.6244 62.0395C35.7714 61.9481 35.8609 61.7872 35.8609 61.614V60.3838C35.8609 59.3376 36.4324 58.3749 37.3509 57.8739L39.869 56.5003C39.9557 56.453 40.0097 56.3622 40.0097 56.2634V55.4807V55.1366C40.0097 53.8854 40.3801 52.6622 41.0741 51.6211L41.1764 51.4676C41.4035 51.127 41.6725 50.8164 41.9771 50.543L45.5008 47.3807C45.6894 43.7315 46.9777 40.4183 48.9941 37.8634C48.6197 38.102 48.2537 38.3539 47.8968 38.6186L46.5958 39.5837C46.5057 39.6506 46.4251 39.7295 46.3563 39.8181L46.1815 40.0437C45.078 41.4668 43.6301 42.5852 41.9744 43.2934L40.5073 44.107C40.3033 44.2201 40.1245 44.3735 39.9816 44.5578L39.5741 45.0834C39.5551 45.1078 39.5467 45.1387 39.5505 45.1694L39.6201 45.719C39.8117 47.2334 39.3045 48.7528 38.2417 49.8484L37.2138 50.7388L34.8313 52.9411L31.7595 55.6021C31.7517 55.6088 31.7427 55.6139 31.7328 55.617L29.01 56.4763C28.3416 56.6872 27.6454 56.2414 27.5575 55.5461C27.5018 55.1065 27.7099 54.6752 28.0885 54.4451L35.5875 49.8881C35.6938 49.8235 35.7521 49.7025 35.7365 49.5792L35.5708 48.2697C35.312 46.2236 36.258 44.212 37.9991 43.1065C38.0826 43.0536 38.1239 42.9547 38.1066 42.8574C37.9649 42.06 37.8801 40.5771 38.5075 39.9303C39.3483 39.0636 42.4815 38.287 44.0019 38.2847C44.9928 38.2832 48.521 35.8664 51.0747 33.9865C50.8834 33.7479 50.7028 33.5009 50.5336 33.2462C50.2995 33.3761 50.0494 33.4837 49.7854 33.5657L43.648 35.4715L38.6899 37.1837C36.8665 37.8133 34.9508 38.1348 33.0217 38.1348C31.5839 38.1348 30.1517 37.9562 28.758 37.6032L21.8931 35.8645C20.8952 35.6118 20.0284 34.994 19.4638 34.1332C18.8251 33.1593 18.6292 31.9604 18.9247 30.8339L19.1291 30.0548C19.1715 29.8933 19.0497 29.7353 18.8827 29.7353H15.5708C14.3767 29.7353 13.1971 29.4736 12.115 28.9685C10.6123 28.2672 9.35867 27.1252 8.52053 25.6943L4.38644 18.6366C3.55696 17.2205 4.1109 15.3979 5.58811 14.6829C7.12705 13.938 8.81463 13.551 10.5244 13.551H14.3283C17.5602 13.551 20.7675 14.1121 23.8074 15.2094L49.4398 24.4615C49.4545 24.4198 49.4696 24.3783 49.485 24.3368C49.2693 24.1416 49.0476 23.953 48.8203 23.7712L47.8045 22.9585C47.1539 22.438 46.4163 22.0368 45.6259 21.7733C44.1971 21.297 42.9579 20.3764 42.0894 19.146L41.1634 17.8342L39.6548 15.0055L39.0831 13.5049C38.4805 11.9231 37.306 10.6252 35.792 9.86818C35.3512 9.6478 34.8876 9.47631 34.4095 9.35679L33.7858 9.20087C33.1796 9.04931 32.6132 8.7688 32.1253 8.37844L31.2972 7.71599C31.0914 7.55136 30.9454 7.32375 30.8815 7.06809C30.7255 6.44434 31.0874 5.80818 31.7032 5.62343L31.8245 5.58706C32.2409 5.46213 32.6921 5.54762 33.0339 5.81621L34.3145 6.82242C34.8503 7.24338 35.4751 7.53642 36.1414 7.67918L36.7056 7.80009C37.4049 7.94994 38.0597 8.26055 38.6182 8.70732C39.3026 9.25484 39.8727 9.93154 40.2961 10.699L42.1828 14.1187C42.5068 14.706 42.9242 15.2366 43.4187 15.6899C44.0485 16.2672 44.811 16.6809 45.5723 17.094C46.001 17.3266 46.4292 17.559 46.8331 17.8202C47.4164 18.1974 47.9869 18.6783 48.5746 19.1736C49.1007 19.617 49.6405 20.072 50.2154 20.4744C50.5407 20.7021 50.927 20.952 51.3539 21.2038C51.4066 21.1434 51.4601 21.0836 51.5143 21.0244V20.1636C51.5143 19.3561 51.1716 18.5866 50.5714 18.0464C49.9712 17.5063 49.6285 16.7367 49.6285 15.9293V15.7086C49.6285 14.4279 50.36 13.2597 51.5121 12.7004L55.1617 10.9288L42.5241 1.33058C42.114 1.01913 42.4364 0.370609 42.9323 0.509451C44.4844 0.94404 45.9244 1.70847 47.154 2.75053L56.2061 10.4218L59.0366 9.04774C59.2285 8.95459 59.4525 8.95459 59.6444 9.04774L62.1122 10.2457L70.9565 2.75053C72.1861 1.70847 73.6262 0.94404 75.1783 0.509451C75.6741 0.370609 75.9965 1.01913 75.5864 1.33058L63.1713 10.7598Z" fill="url(#paint0_linear_110_150)"/></g><defs><filter id="filter0_d_110_150" x="0.0454602" y="0.490234" width="118.498" height="78.9286" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="3.95454"/><feGaussianBlur stdDeviation="1.97727"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_110_150"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_110_150" result="shape"/></filter><linearGradient id="paint0_linear_110_150" x1="4" y1="18.4707" x2="115" y2="17.9707" gradientUnits="userSpaceOnUse"><stop stopColor="#8D7F61"/><stop offset="0.151457" stopColor="#F1DCAD"/><stop offset="0.267035" stopColor="#8E7B53"/><stop offset="0.382648" stopColor="#E5D9A9"/><stop offset="0.495657" stopColor="#8A724C"/><stop offset="0.620286" stopColor="#E5D9A9"/><stop offset="0.73364" stopColor="#8E7B53"/><stop offset="0.866263" stopColor="#F1DCAD"/><stop offset="1" stopColor="#8D7F61"/></linearGradient></defs></svg>
    </div>
  );
};

export default Logo;