<script setup lang="ts">
const expandedItems = ref<number[]>([]);

const toggleItem = (id: number) => {
  if (expandedItems.value.includes(id)) {
    expandedItems.value = expandedItems.value.filter((item) => item !== id);
  } else {
    expandedItems.value.push(id);
  }
};
</script>
<template>
  <div class="wizdome">
    <div class="project">
      <details>
        <summary @click="toggleItem(0)">
          <material-symbols-arrow-right-rounded class="text-4xl icon" />
          브루스 통근버스 웹뷰 개발
        </summary>
        <Transition name="slide-down">
          <div v-if="expandedItems.includes(0)">
            <p class="project__date">2021.05 ~ 2021.06</p>
            <p class="project__subtitle">
              신규 프로젝트인 Bruce 통근버스를 Webview로 개발하여 Hybrid App으로
              배포하는 프로젝트
            </p>
            <p class="project__stack">
              <span title="vue">
                <logos-vue />
              </span>
              <span title="tailwindcss">
                <logos-tailwindcss-icon />
              </span>
              <span title="zeplin">
                <logos-zeplin />
              </span>
            </p>
            <ul>
              <span class="title">
                <material-symbols-check />
                Technical
              </span>
              <li>Vue.js를 이용한 Hybrid App으로 개발</li>
              <li>
                다양한 viewport를 고려하여 당시의 거의 모든 기기에서 동작하는걸
                목표로 개발
              </li>
              <li>
                JWT Token을 효율적으로 이용할 수 있는 Axios Interceptor 구현
              </li>
              <li>PG 결제 연동 및 카카오페이 연동</li>
            </ul>
            <ul>
              <span class="title">
                <material-symbols-check />
                Communication
              </span>
              <li>Zeplin을 이용한 커뮤니케이션</li>
            </ul>
          </div>
        </Transition>
      </details>
    </div>
    <div class="project">
      <details>
        <summary @click="toggleItem(1)">
          <material-symbols-arrow-right-rounded class="text-4xl icon" />
          카카오 통근버스 웹 / 앱 리뉴얼 개발
        </summary>
        <Transition name="slide-down">
          <div v-if="expandedItems.includes(1)">
            <p class="project__date">2021.04 ~ 2021.05</p>
            <p class="project__subtitle">
              기존의 카카오 통근버스 Webview 코드를 전체적으로 리팩토링하는
              프로젝트
            </p>
            <p class="project__stack">
              <span title="react">
                <logos-react />
              </span>
              <span title="redux">
                <logos-redux />
              </span>
              <span title="styled-components">
                <simple-icons-styled-components />
              </span>
              <span title="zeplin">
                <logos-zeplin />
              </span>
            </p>
            <ul>
              <span class="title">
                <material-symbols-check />
                Technical
              </span>
              <li>
                리팩토링을 통해 deprecated된 코드 및 비효율적인 코드 전면 개선
              </li>
              <li>새로운 UI에 맞는 components 설계 및 개발</li>
              <li>PG 결제 연동 및 카카오페이 연동</li>
              <li>Web Sockent을 이용한 실시간 버스 위치 관제 기능 구현</li>
              <li>리팩토링을 통해 성능 및 SEO 접근성 개선</li>
            </ul>
            <ul>
              <span class="title">
                <material-symbols-check />
                Communication
              </span>
              <li>Zeplin을 이용한 커뮤니케이션</li>
            </ul>
          </div>
        </Transition>
      </details>
    </div>
    <div class="project">
      <details>
        <summary @click="toggleItem(2)">
          <material-symbols-arrow-right-rounded class="text-4xl icon" />
          사내 통합 관리자용 사이트 개발
        </summary>
        <Transition name="slide-down">
          <div v-if="expandedItems.includes(2)">
            <p class="project__date">2020.10 ~ 2021.04</p>
            <p class="project__subtitle">
              플랫폼, 버스, 기사, 정류장, 노선 등등 회사에서 운영하는 모든
              서비스를 관리할 수 있고 통계 및 관제가 가능한 사이트를
              개발하였습니다.
            </p>
            <p class="project__stack">
              <span title="vue">
                <logos-vue />
              </span>
              <span title="vuetify">
                <logos-vuetifyjs />
              </span>
              <span title="sass/scss">
                <logos-sass />
              </span>
              <span title="storybook">
                <logos-storybook-icon />
              </span>
            </p>
            <ul>
              <span class="title">
                <material-symbols-check />
                Technical
              </span>
              <li>Vue 프로젝트 Architecture 설계</li>
              <li>
                Vuetify Components를 베이스로 커스텀을 통해 다양한 컴포넌트 개발
              </li>
              <li>Chart.js를 이용한 통계차트 표현</li>
              <li>Store 모듈화로 효율적인 State 관리</li>
            </ul>
            <ul>
              <span class="title">
                <material-symbols-check />
                Communication
              </span>
              <li>Story Book을 이용한 UI Communication</li>
              <li>
                Jira Sprint를 이용한 일정관리 및 메신저 툴과 연동하여 효율적인
                커뮤니케이션에 활용
              </li>
              <li>Confluence를 이용한 문서화 및 팀원들과의 공유</li>
              <li>
                주기적인 미팅을 주도하여 진행상황 및 개발방향을 피드백 받음
              </li>
            </ul>
          </div>
        </Transition>
      </details>
    </div>
  </div>
</template>

<style lang="scss" scoped>
* {
  @apply text-white;
}

.wizdome {
  @apply w-full h-full;
  @apply p-3;
  @apply grid;
  @apply grid-cols-1;
  @apply items-center;
  @apply overflow-y-scroll;
  @apply scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-800;
}

details {
  @apply my-3
  @apply overflow-hidden;

  &[open] > summary > .icon {
    @apply transform;
    @apply rotate-90;
  }

  pre,
  p,
  ul {
    @apply ml-11;
  }

  p {
    @apply mt-1;
  }

  ul {
    @apply mt-3;

    .title {
      @apply flex;
      @apply items-center;
      @apply gap-x-1;
      @apply underline decoration-wavy;
      @apply mb-1;
    }
  }
}

summary {
  @apply flex items-center;
  @apply list-none;
  @apply font-yeonsung;
  @apply text-2xl;
  @apply cursor-pointer;
}

.icon {
  @apply transition-all;
  @apply duration-300;
  @apply ease-in-out;
}

.project {
  @apply transition-all duration-300 ease-in-out;
  &__date {
    @apply font-nanumBrush;
    @apply text-xl italic;
  }
  &__stack {
    @apply flex;
    @apply gap-x-2;
    @apply text-lg;
  }
}

ul > li {
  @apply list-disc;
  @apply list-inside ml-5;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}
.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.slide-down-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
